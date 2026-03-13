'use client';
import { useState, useEffect, useCallback, useRef } from "react";

type Serializer<T> = {
  read: (raw: string) => T;
  write: (value: T) => string;
};

type UseLocalStorageSyncOptions<T> = {
  /** Custom serializer. Defaults to JSON.parse / JSON.stringify */
  serializer?: Serializer<T>;
  /** Listen for cross-tab storage events. Default: true */
  syncAcrossTabs?: boolean;
  /** Called when a storage error occurs */
  onError?: (error: unknown) => void;
};

type UseLocalStorageSyncReturn<T> = {
  value: T;
  setValue: (newValue: T | ((prev: T) => T)) => void;
  removeValue: () => void;
  error: Error | null;
};

const defaultSerializer = <T>(): Serializer<T> => ({
  read: (raw) => JSON.parse(raw) as T,
  write: (value) => JSON.stringify(value),
});

/**
 * useLocalStorageSync
 *
 * Syncs a state value with localStorage. Supports:
 * - SSR safety (no window access during SSR)
 * - Cross-tab synchronization via StorageEvent
 * - Custom serializers
 * - Error handling
 * - Functional updater pattern (like useState)
 *
 * @param key      - localStorage key
 * @param initial  - Initial/fallback value
 * @param options  - Optional configuration
 */
export function useLocalStorageSync<T>(
  key: string,
  initial: T,
  options: UseLocalStorageSyncOptions<T> = {}
): UseLocalStorageSyncReturn<T> {
  const {
    serializer = defaultSerializer<T>(),
    syncAcrossTabs = true,
    onError,
  } = options;

  const [error, setError] = useState<Error | null>(null);

  // Stable refs for values that must not appear in dependency arrays.
  // Putting callback props (onError) or non-primitive initial values directly
  // in deps causes a new reference on every render → infinite loop.
  const serializerRef = useRef(serializer);
  serializerRef.current = serializer;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  // Wrap `initial` in a ref so object/array defaults don't break deps.
  const initialRef = useRef(initial);
  // Intentionally NOT updating on every render — initial is a fallback, not reactive.

  const readFromStorage = useCallback((): T => {
    if (typeof window === "undefined") return initialRef.current;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) return initialRef.current;
      return serializerRef.current.read(raw);
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      onErrorRef.current?.(e);
      return initialRef.current;
    }
  }, [key]); // ← only `key` is a real reactive dep here

  const [value, setValueState] = useState<T>(readFromStorage);

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValueState((prev) => {
        const next =
          typeof newValue === "function"
            ? (newValue as (prev: T) => T)(prev)
            : newValue;

        try {
          window.localStorage.setItem(key, serializerRef.current.write(next));
          setError(null);
        } catch (err) {
          const e = err instanceof Error ? err : new Error(String(err));
          setError(e);
          onErrorRef.current?.(e);
        }

        return next;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setError(null);
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err));
      setError(e);
      onErrorRef.current?.(e);
    }
    setValueState(initialRef.current);
  }, [key]);

  // Re-read when key changes
  useEffect(() => {
    setValueState(readFromStorage());
  }, [key, readFromStorage]);

  // Sync across browser tabs
  useEffect(() => {
    if (!syncAcrossTabs || typeof window === "undefined") return;

    const handler = (e: StorageEvent) => {
      if (e.key !== key) return;

      if (e.newValue === null) {
        setValueState(initialRef.current);
        return;
      }

      try {
        setValueState(serializerRef.current.read(e.newValue));
        setError(null);
      } catch (err) {
        const e2 = err instanceof Error ? err : new Error(String(err));
        setError(e2);
        onErrorRef.current?.(e2);
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, syncAcrossTabs]); // ← onError и initial убраны из deps

  return { value, setValue, removeValue, error };
}