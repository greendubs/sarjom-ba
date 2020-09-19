import React from 'react'
import Layout from 'components/common/Layout'
import { Container } from '@material-ui/core'
import SEO from 'components/common/Seo'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'

export default () => (
  <Layout>
    <div className="container">
      <SEO title="Data Licenses" />

      <Breadcrumbs separator=">>" aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="textPrimary" href="/data-licenses" aria-current="page">
          Data Licenses
        </Link>
      </Breadcrumbs>

      <Container>
        <h2>Data License</h2>
        <p>
          Most of the datasets contributing to citizen science are made publicly
          available under the following types of licenses. We want you to make
          an informed decision about the licenses that you can attach to your
          datasets through our platform. This will help us in providing you with
          attributions whenever your contributions are used anywhere on our
          platform or shared across our partners. And of course, if you wish to
          remain an anonymous guardian-angel for our planet, we can do that for
          you as well!
        </p>
        <hr />
        <h2>Types of Licenses available</h2>
        <p>
          We use the following types of licenses and attach it to your datasets
          as recommended by a popular not-for-profit organization,{' '}
          <a href="https://choosealicense.com/non-software/" target="_site">
            choosealicense.com
          </a>
        </p>
        <ul>
          <li>
            <a
              href="https://choosealicense.com/licenses/cc0-1.0/"
              target="_site"
            >
              Creative Commons Zero v1.0 Universal(CC0-1.0)
            </a>
          </li>
          <li>
            <a
              href="https://choosealicense.com/licenses/cc-by-4.0/"
              target="_site"
            >
              Creative Commons Attribution 4.0 International(CC-BY-4.0)
            </a>
          </li>
          <li>
            <a
              href="https://choosealicense.com/licenses/cc-by-sa-4.0/"
              target="_site"
            >
              Creative Commons Attribution Share Alike 4.0
              International(CC-BY-SA-4.0)
            </a>
          </li>
        </ul>
        <p>
          We are still in the development phase and are looking to develop more
          open and environment-friendly licenses and attributions schemes that
          can fundamentally change and democratize the commercial landscape of
          digital rights and assets management.{' '}
        </p>
      </Container>
    </div>
  </Layout>
)
