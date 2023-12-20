"use client";

import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState} from 'react'

type DraftSize = {
  x: number,
  y: number
}

type DraftContextProps = {
  draftSize: DraftSize | undefined
  setDraftSize: Dispatch<SetStateAction<DraftSize | undefined>>
}

export const defaultDraftValues: DraftContextProps = {
  draftSize: undefined,
  setDraftSize: () => null
}

const DraftContext = createContext(defaultDraftValues)

const DraftProvider: FC<PropsWithChildren> = ({children}) => {
  const [draftSize, setDraftSize] = useState(defaultDraftValues.draftSize)
  
  return (
    <DraftContext.Provider value={{draftSize, setDraftSize}}>{children}</DraftContext.Provider>
  )
}

const useDraftContext = () => useContext(DraftContext)

export {DraftProvider, useDraftContext}
