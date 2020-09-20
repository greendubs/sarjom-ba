import React from 'react'
import { Link } from 'gatsby'
import styles from './header-footer.module.css'
import { Typography } from '@material-ui/core'

export default ({ noPad }) => (
  <footer className={styles.footer} style={{ padding: '1rem', marginTop: (noPad ? '0px' : '1.45rem') }}>
    <div className="center-text flex-container container">
      <Typography variant='body2' style={{ color: 'white' }}>
        @Sarjom, CitSci Earth Lab, Seattle, USA
      </Typography>
      <nav>
      <Typography variant='body1' style={{ color: 'white' }}>
        <Link to="/help" className={styles.footernav}>
        
          Help and Support
      
        </Link>
        {`  `}
        <Link to="/market-place" className={styles.footernav}>
  
          Eco-marketplace
  
        </Link>
        {`  `}
        <Link to="/feedback" className={styles.footernav}>

          Feedback
        </Link>
        {`  `}
        <a
          href="https://github.com/greendubs"
          rel="noopener noreferrer"
          className={styles.footernav}
        >
          Github
        </a>
        {`  `}
        </Typography>
      </nav>
    </div>
  </footer>
)
