import { Link, navigate } from 'gatsby'
import React from 'react'
import styles from './header-footer.module.css'
import Context from 'components/common/Context'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'


const navTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        marginLeft: '2rem',
      },
    },
  },
})

export default class Header extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {context => (
          <AppBar
            position="fixed"
            color="default"
            style={{ marginBottom: (this.props.noPad ? '5px' : '2rem') }}
          >
          {console.log(this.props.noPad)}
            <ToolBar>
              <Typography type="title" color="inherit" style={{ flexGrow: 1 }}>
                <Link
                  to="/"
                  style={{
                    color: `black`,
                    textDecoration: `none`,
                  }}
                >
                  {this.props.siteAuthor + ' | ' + this.props.siteTitle}
                </Link>
              </Typography>
              {/* The position and avatar can be modified. I thought it would be good to indicate that the user is logged in. */}
              {context.data.isLoggedIn && (
                <Avatar style={{ backgroundColor: `mediumseagreen` }}>
                  {' '}
                  {context.data.userName.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <ThemeProvider theme={navTheme}>
                <Typography>
                  <Button>
                    <Link to="/" className={styles.link}>
                      Home
                    </Link>
                  </Button>
                  <Button>
                    <Link to="/about" className={styles.link}>
                      About Us
                    </Link>
                  </Button>
                  <Button>
                    <Link to="/directory" className={styles.link}>
                      Directory
                    </Link>
                  </Button>
                  <Button>
                    <Link to="/join-us" className={styles.link}>
                      Join Us
                    </Link>
                  </Button>
                  {/* {console.log(context.user.isLoggedIn)} */}
                  {context.data.isLoggedIn ? (
                    /*TODO: write a component to create a confirm popup before logging out and then */
                    <Button
                      variant="contained"
                      style={{
                        marginLeft: '2rem',
                        color: 'white',
                        backgroundColor: '#3EC28F',
                      }}
                      onClick={() => {
                        console.log('logging out') //wrap these in the confirmation popup
                        context.data.setUserData(
                          false,
                          '',
                          '',
                          '',
                          '',
                          '',
                          [],
                          'guest'
                        )
                        this.forceUpdate()
                        navigate('/')
                      }}
                    >
                      Logout
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: '#3EC28F',
                        marginLeft: '2rem',
                        color: 'white',
                      }}
                    >
                      <Link to="/app/login" className={styles.login}>
                        Login
                      </Link>
                    </Button>
                  )}
                </Typography>
              </ThemeProvider>
            </ToolBar>
          </AppBar>
        )}
      </Context.Consumer>
    )
  }
}
