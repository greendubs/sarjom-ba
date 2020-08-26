import React from 'react'
import { useContext} from "react"
import { navigate } from "gatsby"
import Context from "components/common/Context"

const PrivateRoute = ({ role, component: Component, location, ...rest }) => {
  const { data } = useContext(Context)

  // TODO: maybe implement an alert later that tells client why they can't access the current route
  if ((!data.isLoggedIn && location.pathname !== `/app/login`) || data.role !== role) {
    navigate("/app/login")
    // console.log("wrong role")
    return null
  } 
  
  // console.log("good role")
  // console.log((!data.isLoggedIn && location.pathname !== `/app/login`))
  // console.log(role)

  return <Component {...rest} />
}

export default PrivateRoute