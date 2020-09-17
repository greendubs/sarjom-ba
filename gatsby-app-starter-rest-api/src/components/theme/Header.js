import { Link, navigate } from 'gatsby'
import React from 'react'
import styles from './header-footer.module.css'
import Context from 'components/common/Context'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Login from 'components/Login'

// export default ({ siteTitle, isLoggedIn, logout }) => (
//   <header className={styles.header}>
//     <div className="center-text flex-container container">
//       <h2 style={{ margin: 0 }}>
//         <Link
//           to="/"
//           style={{
//             color: `white`,
//             textDecoration: `none`,
//           }}
//         >
//           {'Sarjom | ' + siteTitle}
//         </Link>
//       </h2>
//     </div>
//     <div className="center-text flex-container container">
//       <nav className={styles.nav}>
//         <Link to="/" className={styles.link}>
//           Home
//         </Link>
//         {` `}
//         <Link to="/about" className={styles.link}>
//           About Us
//         </Link>
//         {` `}
//         <Link to="/directory" className={styles.link}>
//           Directory
//         </Link>
//         {` `}
//         <Link to="/join-us" className={styles.link}>
//           Join Us
//         </Link>
//         {` `}
//         {isLoggedIn && (
//           <button
//             type="submit"
//             onClick={logout}
//             className="btn btn-primary gradient-green"
//           >
//             Logout
//           </button>
//         )}
//       </nav>
//     </div>
//   </header>
// )

// function LoginMenu() {
//   const [anchorEl, setAnchorEl] = React.useState(null)

//   const handleClick = event => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   return (
//     <span>
//       <Button
//         variant="contained"
//         style={{
//           backgroundColor: '#3EC28F',
//           marginLeft: '2rem',
//           color: 'white',
//         }}
//         aria-controls="simple-menu"
//         aria-haspopup="true"
//         //onClick={handleClick}
//       >
//         <Link to='/app'>
//           Login
//         </Link>
//       </Button>

//       <Menu
//         id="simple-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>
//           <Link to="/app" className={styles.login}>
//             Sender Login
//           </Link>
//         </MenuItem>
//         <Divider />
//         <MenuItem onClick={handleClose}>
//           <Link to="/app" className={styles.login}>
//             Collector Login
//           </Link>
//         </MenuItem>
//       </Menu>
//     </span>
//   )
// }

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
            position="static"
            color="default"
            style={{ marginBottom: '2rem' }}
          >
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
