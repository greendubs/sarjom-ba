import React from 'react'
import Layout from 'components/common/Layout'
import SEO from 'components/common/Seo'
import Image from 'components/Image'
import { Button, Container, Typography }  from '@material-ui/core'

export default () => (
  <Layout>
    <SEO title="In development" />
    <Container maxWidth='sm'>
        <Typography variant='h4' align='center' gutterBottom>Sorry, this module is currently under development!</Typography>
        <Image/>
        <Typography variant='subtitle1' align='center'>
            To know more about our work, click here!
            <div/>
            <Button variant="contained" style={{ backgroundColor: '#3EC28F', marginLeft: '0px' }}>
                Sign Up
            </Button>
        </Typography>
        
    </Container>
  </Layout>
)