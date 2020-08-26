import React, { useReducer, useContext } from 'react'
import Context from 'components/common/Context'
import reducer from './taskReducer'
import userReducer from './userReducer'

export default ({ children }) => {
  const [tasks, dispatch] = useReducer(reducer, [])
  const [user, dispatchUserAction] = useReducer(userReducer, {})
  const {data} = useContext(Context);

  data.toggleLogStatus = () => {
    let oldStatus = data.isLoggedIn;
    // console.log("old status: " + oldStatus);
    data.isLoggedIn = !oldStatus;
    // console.log(data.isLoggedIn)
  }

  data.setUserData = (role, userName, token, tokenId) => {
    data.role = role
    data.userName = userName
    data.token = token
    data.tokenId = tokenId
    console.log("context updated")
    console.log(data)
  }

  return (
    <Context.Provider
      value={{
        tasks,
        dispatch,
        user,
        dispatchUserAction,
        data,
      }}
    >
      {children}
    </Context.Provider>
  )
}
