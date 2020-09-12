import React from 'react'
import Layout from 'components/common/Layout'
import SEO from 'components/common/Seo'
import Image from 'components/Image'
import SignUpForm from 'components/common/SignUpForm'
import FeedbackForm from 'components/common/FeedbackForm'
import { Grid, Container, Typography }  from '@material-ui/core'

export default () => (
  <Layout>
    <SEO title="In development" />
    <Container maxWidth='sm'>
        <Typography variant='h4' align='center' gutterBottom>Sorry, this module is currently under development!</Typography>
        <Image/>
        <Grid container direction='column' alignItems='center'>
          <Typography variant='subtitle1' align='center' gutterBottom>
              To know more about our work, click here!
          </Typography>
          <SignUpForm/>
        </Grid>
    </Container>
  </Layout>
)