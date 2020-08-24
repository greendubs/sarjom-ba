import React, { useReducer, useContext } from 'react'
import Context from 'components/common/Context'
import reducer from './taskReducer'
import userReducer from './userReducer'

export default ({ children }) => {
  // const [tasks, dispatch] = useReducer(reducer, [])
  // const [user, dispatchUseAction] = useReducer(userReducer, {})
  const {user, dispatchUserAction} = useContext(Context);

  return (
    <Context.Provider
      value={{
        // tasks,
        // dispatch,
        // user,
        // dispatchUserAction,
        user
      }}
    >
      {children}
    </Context.Provider>
  )
}
