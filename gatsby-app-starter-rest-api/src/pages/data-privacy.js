import React from 'react'
import Layout from 'components/common/Layout'
import { Container } from '@material-ui/core'
import SEO from 'components/common/Seo'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'

export default () => (
  <Layout>
    <div className="container">
      <SEO title="Data Privacy" />

      <Breadcrumbs separator=">>" aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="textPrimary" href="/data-privacy" aria-current="page">
          Data Privacy
        </Link>
      </Breadcrumbs>

      <Container>
        <h2>Data Privacy</h2>
        <p>
          We are currently in the alpha-development phase and our data privacy
          guidelines are currently in development and review. However, we do
          want to iterate the following principles that ultimately guide our
          data privacy guidelines.
        </p>
        <ul>
          <li>
            Your datasets will always belong to the citizen science community
            that you belong too.
          </li>
          <li>
            We will ensure that as a community you get to decides when and how
            your datasets are shared outside your community.
          </li>
          <li>
            Currently in development phase, we have only limited online
            data-storage capacity and hence, we will limit data storage to 1GB
            per organization per project.
          </li>
        </ul>
        <hr />
        <p>
          We would like to hear from you more in this space. If you are
          interested in this space, please feel free to hit us up!{' '}
          <a href="sign-up.html" target="_survey">
            Click here!
          </a>
        </p>
      </Container>
    </div>
  </Layout>
)
