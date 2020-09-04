import { createContext } from 'react'

const Context = createContext({
  data: {
    isLoggedIn: false,
    toggleLogStatus: () => {},
    token: '',
    tokenId: '',
    email: '', // Context currently holds all of the data from our login request response.
    userId: '', // Make sure to trim out the excess data later.
    userName: '',
    organizations: [],
    role: 'guest',

    setUserData: () => {},
    fetchDecoy: false, //just a decoy value so AppWrapper doesn't load infinitely trying to fetch the user, need to figure out what this is for
    //what other data should be stored here?

    sendProjectId: '',
    sendProjectName: '',
    sendOrganizationId: '',
    setSendData: () => {},
  },
})

export default Context
