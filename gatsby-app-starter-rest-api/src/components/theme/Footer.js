import React from 'react'
import { Link } from 'gatsby'
import styles from './header-footer.module.css'

export default () => (
  <footer className={styles.footer}>
    <div className="center-text flex-container container">
      <h6 style={{ paddingTop: `1rem` }}>
        &#169;Greendubs, iSchool, University of Washington, 2020
      </h6>
      <nav>
        <Link to="/help" className={styles.footernav}>
          Help and Support
        </Link>
        {` `}
        <Link to="/market-place" className={styles.footernav}>
          Eco-marketplace
        </Link>
        {` `}
        <Link to="/feedback" className={styles.footernav}>
          Feedback
        </Link>
        {` `}
        <a
          href="https://github.com/greendubs"
          rel="noopener noreferrer"
          className={styles.footernav}
        >
          Github
        </a>
        {` `}
      </nav>
    </div>
  </footer>
)
