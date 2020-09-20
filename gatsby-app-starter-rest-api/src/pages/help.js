import React from 'react'
import Layout from 'components/common/Layout'
import SEO from 'components/common/Seo'
import { Container,
         Typography } from '@material-ui/core'

export default () => (
  <Layout>
    <>
      <SEO title='Help'/>
      <Container align='center' maxWidth='sm'>
        <Typography variant='body1'>
          <p>Please write to use for any help or support issues at <a>support@citsci.earth</a></p>
          <p>This page will be enhanced later to develop community guidelines, FAQs, and software documentations.</p>
        </Typography>
      </Container>
    </>
  </Layout>
)