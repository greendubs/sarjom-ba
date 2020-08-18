import { Link } from 'gatsby'
import React from 'react'
import styles from './header-footer.module.css'

export default ({ siteTitle, isLoggedIn, logout }) => (
  <header className={styles.header}>
    <div className="center-text flex-container container">
      <h2 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {'Sarjom | ' + siteTitle}
        </Link>
      </h2>
    </div>
    <div className="center-text flex-container container">
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        {` `}
        <Link to="/about" className={styles.link}>
          About Us
        </Link>
        {` `}
        <Link to="/directory" className={styles.link}>
          Directory
        </Link>
        {` `}
        <Link to="/join-us" className={styles.link}>
          Join Us
        </Link>
        {` `}
        {isLoggedIn && (
          <button
            type="submit"
            onClick={logout}
            className="btn btn-primary gradient-green"
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  </header>
)
