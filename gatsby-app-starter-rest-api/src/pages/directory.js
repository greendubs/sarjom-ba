import React from 'react'
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import Layout from 'components/common/Layout'
import SEO from 'components/common/Seo'
import CardSet from './../components/common/CardSet'
import { Container,
         Typography,
         Button,
          } from '@material-ui/core'

const data = [
  { name: "Sample Name", organisation: { name: "Organization Name"}, },
  { name: "Sample Name", organisation: { name: "Organization Name"}, },
  { name: "Sample Name", organisation: { name: "Organization Name"}, },
  { name: "Sample Name", organisation: { name: "Organization Name"}, },
]

export default () => (
  <Layout>
    <SEO title="Directory"/>
    <Container maxWidth='lg' style={{ backgroundColor: '#e9ecef' }}>
        <br/>
        <Container maxWidth='sm'>
        <Typography variant='h5' align='center' gutterBottom style={{marginBottom: '1rem'}}>
          Project Directory
        </Typography>
        <Typography variant='subtitle2' align='center' gutterBottom style={{marginBottom: '1rem'}}>
          This page is currently under development. But you can view some of the projects on our platform.
        </Typography>
        </Container>
        <br/>
        <Container maxWidth='md'>
        <CardSet 
          cards={data} 
          button1={{label: 'About Us', function: () => navigate("/app/organizations")}}
          button2={{label: 'View Our Stories', function: () => console.log("dummy")}}/>
        </Container>
        <Typography variant='body2' align='center' gutterBottom style={{margin: '1rem'}}>
          List your citizen science projects/organization in our directory so that more people can find and join your work.
        </Typography>
        <br/>
    </Container>
    <Typography align='center' gutterBottom style={{margin: '1rem'}}>
      <Link to='/join-us'>
        <Button variant='contained' style={{ backgroundColor: `#3EC28F`, color: 'white'}}>
          Join Us
        </Button>
      </Link>
    </Typography>
  </Layout>
)