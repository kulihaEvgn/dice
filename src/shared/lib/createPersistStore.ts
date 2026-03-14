import { persist, PersistStorage } from 'zustand/middleware';
import { compress, decompress } from 'lz-string';
import { parse, stringify } from 'superjson';
import { create, StateCreator } from 'zustand';

export const createPersistStore = <T extends Record<string, any> = Record<string, any>>(
  slice: StateCreator<T>,
  storageName: string,
) => {
  const persistStorage: PersistStorage<T> = {
    setItem: async (name, value) => {
      const compressedState = compress(stringify(value));
      localStorage.setItem(name, compressedState);
    },
    getItem: async (name) => {
      const str = localStorage.getItem(name);
      if (!str) return null;
      return parse(decompress(str));
    },
    removeItem: async (name) => localStorage.removeItem(name),
  };

  return create<T>()(
    persist((...args) => slice(...args), { name: storageName, storage: persistStorage }),
  );
};
