import { createContext } from 'react'

const Context = createContext({
  user: {
    isLoggedIn: false,
    userType: "guest"
  }
})

export default Context
