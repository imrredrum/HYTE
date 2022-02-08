import { createContext, useReducer, useEffect } from 'react'
import { ifServer } from '/src/helper'
import Reducer from './Reducer'

export const Context = createContext()

const ContextProvider = ({ children }) => {
  const [auth, dispatch] = useReducer(Reducer, [], () => {
    const localData = ifServer() ? null : localStorage.getItem('auth')
    return localData
      ? JSON.parse(localData)
      : {
          isAuthed: false,
          user: {},
        }
  })

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth))
  }, [auth])

  return (
    <Context.Provider value={{ auth, dispatch }}>{children}</Context.Provider>
  )
}

export default ContextProvider
