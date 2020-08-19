import React from 'react'
import Layout from 'components/common/Layout'
import SEO from 'components/common/Seo'
import { Button, Container, Typography }  from '@material-ui/core'

export default () => (
  <Layout>
    <SEO title="In development" />
    <Container maxWidth='sm'>
        <Typography variant='h2' align='center'>Sorry, this module is currently under development!</Typography>
        <Typography variant='h4' align='center'>
            To know more about our work, click here!
            <div/>
            <Button variant="contained" style={{ backgroundColor: '#3EC28F', marginLeft: '0px' }}>
                Sign Up
            </Button>
        </Typography>
        
    </Container>
  </Layout>
)