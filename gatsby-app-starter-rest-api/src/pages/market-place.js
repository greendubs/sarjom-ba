import React from 'react'
import Layout from 'components/common/Layout'
import SEO from 'components/common/Seo'
import { Container,
         Typography } from '@material-ui/core'

export default () => (
  <Layout>
    <>
      <SEO title='Eco-Marketplace'/>
      <Container align='center' maxWidth='md'>
        <Typography variant='body1'>
          <p>This page is currently under development and will include a list of eco-friendly
            hardware manufacturers that can sell devices for our community members (at a discounted price)
            to help collect citizen science datasets from their homes and neighborhoods with ease.
            All devices purchased will be fully supported by our team and our vendors for warranty and fair use.
          </p>
        </Typography>
      </Container>
    </>
  </Layout>
)