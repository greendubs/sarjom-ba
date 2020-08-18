import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from 'components/theme/Header'
import Footer from 'components/theme/Footer'
import './layout.css'
import 'unnamed'

export default ({ children, isLoggedIn, logout }) => {
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
        siteTitle={site.siteMetadata.title}
        siteAuthor={site.siteMetadata.author}
        isLoggedIn={isLoggedIn}
        logout={logout}
      />
      <main>{children}</main>
      <Footer />
    </>
  )
}
