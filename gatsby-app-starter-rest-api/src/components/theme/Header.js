import { Link } from 'gatsby'
import React from 'react'

export default ({ siteTitle, isLoggedIn, logout }) => (
  <header
    style={{
      background: `white`,
      marginBottom: `1.45rem`,
      padding: '1rem 0',
      borderBottom: '2px gray solid'
    }}
  >
    <div className="center-text flex-container container">
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {'Sarjom | ' + siteTitle}
        </Link>
      </h1>
      {isLoggedIn && (
        <button
          type="submit"
          onClick={logout}
          className="btn btn-primary gradient-green"
        >
          Logout
        </button>
      )}
    </div>
  </header>
)
