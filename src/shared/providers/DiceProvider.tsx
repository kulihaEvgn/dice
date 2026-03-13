"use client"
import { createContext, PropsWithChildren, useContext, useState } from "react"
import { IDiceState, IGameResult, useLocalStorageSync } from "@/shared";

const DICE_STATE_KEY = "diceState";

const DiceContext = createContext<IDiceState>({
  gameResults: [],
})

export const DiceProvider = ({children}: PropsWithChildren) => {

  const { value, setValue } = useLocalStorageSync<IDiceState>(DICE_STATE_KEY, {gameResults: []})

  const setGameResults = (result: IGameResult) => {
    setValue((prev) => {
      const results = prev.gameResults;

      return {
        ...prev,
        gameResults: results.length < 10 ? [...results, result] : [result]
      }

    })
  }


  return (
    <DiceContext.Provider value={{ gameResults: value.gameResults, setGameResults }}>
      {children}
    </DiceContext.Provider>
  )
}

export const useDice = () => useContext(DiceContext)