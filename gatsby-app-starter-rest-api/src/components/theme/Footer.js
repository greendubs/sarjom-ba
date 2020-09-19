import React from 'react'
import { Link } from 'gatsby'
import styles from './header-footer.module.css'

export default ({ noPad }) => (
  <footer className={styles.footer} style={{marginTop: (noPad ? '0px' : '1.45rem')}}>
    <div className="center-text flex-container container">
      <h5 style={{ color: 'white', paddingTop: `1rem` }}>
        &#169;Sarjom, CitSci Earth Lab, Seattle, USA
      </h5>
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
