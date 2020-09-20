import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from 'components/theme/Header'
import Footer from 'components/theme/Footer'
import 'unnamed'
import './layout.css'

export default ({ children, isLoggedIn, logout, gap }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
          }
        }
      }
    `
  )

  return (
    <>
      <Header
        noPad={gap}
        siteTitle={site.siteMetadata.title}
        siteAuthor={site.siteMetadata.author}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />
      <div className="main-container">{children}</div>
      <Footer noPad={gap}/>
    </>
  )
}
