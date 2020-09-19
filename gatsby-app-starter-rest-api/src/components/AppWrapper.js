import React, { useState, useContext } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'
import setAuthToken from 'helpers/setAuthToken'
import Layout from 'components/common/Layout'
import Context from './common/Context'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

export default ({ noPad, children }) => {
  const { data, dispatchUserAction } = useContext(Context)
  const [loading, setLoading] = useState(false)

  const fetchUser = async () => {
    try {
      const token = window.localStorage.getItem('token')
      console.log(token)
      console.log(data)
      if (token) {
        console.log('token is not undefined')
        const { data } = await axios({
          method: 'GET',
          url: `${process.env.API}/user/verify`,
          headers: {
            'Content-Type': 'application/json',
            'x-auth': token,
          },
        })

        await setAuthToken(data.token)
        dispatchUserAction({ type: 'SAVE_USER', payload: data.user })
        window.localStorage.setItem('token', data.token)

        if (
          //window.location.pathname === '/app/login' ||
          window.location.pathname === '/app/send' ||
          window.location.pathname === '/app' ||
          //window.location.pathname === '/app/login/' ||
          window.location.pathname === '/app/send/' ||
          window.location.pathname === '/app/'
        ) {
          navigate('/app/send/')
        }
        setLoading(false)
      } else {
        if (
          window.location.pathname === '/app/tasks' ||
          window.location.pathname === '/app/tasks/' ||
          window.location.pathname === '/app/task' ||
          window.location.pathname === '/app/task/' ||
          window.location.pathname === '/app/task/new/' ||
          window.location.pathname === '/app/task/new' ||
          window.location.pathname === '/app/send'
        ) {
          navigate('/app/login/')
        }
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await axios.delete(`${process.env.API}/user/logout`)
      dispatchUserAction({ type: 'LOGOUT' })
      window.localStorage.removeItem('token')
      setAuthToken(false)
      navigate('/')
      //TO-DO: EDIT CONTEXT
    } catch (err) {
      console.log(err)
    }
  }

  //useEffect(() => {
  //  if (!data.fetchDecoy) {
  //    fetchUser()
  //   console.log('using effect')
  //  setLoading(false)
  //}
  //}, [])

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <Layout gap={noPad} isLoggedIn={data.isLoggedIn} logout={logout}>
          {console.log(noPad)}
          {children}
        </Layout>
      )}
    </>
  )
}
