import { createContext } from 'react'

const Context = createContext({
  data: {
    isLoggedIn: false,
    toggleLogStatus: () => {},
    role: "guest",
    userName: "",
    token: "",
    tokenId: "",
    setUserData: () => {},
    fetchDecoy: false //just a decoy value so AppWrapper doesn't load infinitely trying to fetch the user, need to figure out what this is for
    //what other data should be stored here?
  }
})

export default Context
