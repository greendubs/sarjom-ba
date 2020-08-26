import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import Context from 'components/common/Context'

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { data } = useContext(Context)
  if (!data.isLoggedIn && location.pathname !== `/app/login`) {
    navigate('/app/login')
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute
