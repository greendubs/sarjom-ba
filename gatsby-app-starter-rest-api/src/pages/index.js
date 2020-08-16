import React from 'react'
import { Link } from 'gatsby'
import Layout from 'components/common/Layout'
import SEO from 'components/common/Seo'
import {Container, Button} from '@material-ui/core'

export default () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className="container center-text">
      <Container maxWidth="xs">
        <h1>Welcome to CitSci Earth</h1>
        <p>
          CitSci Earth lets you share your datasets with people and organizations across the world. 
          Contributors receive attributions whenever their datasets are published by a community.
        </p>
      </Container>
      <Button variant="contained" style={{backgroundColor: '#3EC28F'}}>
        Sign Up
      </Button>
    </div>
  </Layout>
)
