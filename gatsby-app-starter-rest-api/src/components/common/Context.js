import { createContext } from 'react'

const Context = createContext({
  data: {
    isLoggedIn: false,
    toggleLogStatus: () => {},
    userType: "guest",
    fetchDecoy: false //just a decoy value so appwrapper doesn't load infinitely trying to fetch the user, need to figure out what this is for
    //what other data should be stored here?
  }
})

export default Context
