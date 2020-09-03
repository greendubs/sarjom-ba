import React, { useReducer, useContext } from 'react'
import Context from 'components/common/Context'
import reducer from './taskReducer'
import userReducer from './userReducer'

export default ({ children }) => {
  const [tasks, dispatch] = useReducer(reducer, [])
  const [user, dispatchUserAction] = useReducer(userReducer, {})
  const { data } = useContext(Context)

  data.toggleLogStatus = () => {
    let oldStatus = data.isLoggedIn
    // console.log("old status: " + oldStatus);
    data.isLoggedIn = !oldStatus
    // console.log(data.isLoggedIn)
  }

  data.setUserData = (
    loginStatus,
    token,
    tokenId,
    email,
    userId,
    userName,
    organizations,
    role
  ) => {
    console.log(data)
    data.isLoggedIn = loginStatus
    data.token = token
    data.tokenId = tokenId
    data.email = email
    data.userId = userId
    data.userName = userName
    data.organizations = organizations
    data.role = role
    console.log('context updated')
    console.log(data)
  }

  data.setSendData = (organizationId, projectId) => {
    console.log(data)
    data.sendProjectId = projectId
    data.sendOrganizationId = organizationId
    console.log('send data updated')
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
