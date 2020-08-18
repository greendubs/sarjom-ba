import { Link } from 'gatsby'
import React from 'react'
import styles from './header-footer.module.css'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/ToolBar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

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

const navButtonTheme = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          marginLeft: "2rem"
        }
      }
    }
  });
  
  export default class Header extends React.Component { 
    render() {
      return (
        <AppBar position="static" color='default' style={{marginBottom: '2rem'}}>
          <ToolBar>
            <Typography type="title" color="inherit" style={{ flexGrow: 1}}>
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
            <ThemeProvider theme={navButtonTheme}> 
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
                <Button variant="contained" color="white">
                  Login
                </Button>
              </Typography>
              </ThemeProvider> 
        </ToolBar>
      </AppBar>
    );
  }
}
