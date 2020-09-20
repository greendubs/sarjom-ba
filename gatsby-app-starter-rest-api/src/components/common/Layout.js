import React from 'react'
import BackgroundImage from 'gatsby-background-image'
import { useStaticQuery, graphql } from 'gatsby'
import Header from 'components/theme/Header'
import Footer from 'components/theme/Footer'
import 'unnamed'
import './layout.css'

export default ({ children, noPad }) => {
  const { site, mainBackground } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
          }
        },
        mainBackground: file(relativePath: {eq: "Background-CitSciEarth.png"}) {
          childImageSharp {
            fluid(maxWidth: 2000, quality: 60) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
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
      />
      <BackgroundImage 
        fadeIn
        fluid={mainBackground.childImageSharp.fluid}
        className={noPad ? "home-container" : 'main-container'}
      >
        {children}
      </BackgroundImage>
      <Footer/>
    </>
  )
}

