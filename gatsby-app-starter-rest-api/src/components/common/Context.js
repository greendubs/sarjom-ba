import { createContext } from 'react'

const Context = createContext({
  data: {
    isLoggedIn: false,
    toggleLogStatus: () => {},
    userType: "guest",
    fetchDecoy: false //just a decoy value so appwrapper doesn't load infinitely trying to fetch the user
    
  }
})

export default Context
