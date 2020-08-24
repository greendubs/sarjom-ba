import React, { useReducer, useContext } from 'react'
import Context from 'components/common/Context'
import reducer from './taskReducer'
import userReducer from './userReducer'

export default ({ children }) => {
  const [tasks, dispatch] = useReducer(reducer, [])
  const [user, dispatchUserAction] = useReducer(userReducer, {})
  const {data} = useContext(Context);

  return (
    <Context.Provider
      value={{
        tasks,
        dispatch,
        user,
        dispatchUserAction,
        data
      }}
    >
      {children}
    </Context.Provider>
  )
}
