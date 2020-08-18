import React from 'react'
import { Link } from 'gatsby'
import Layout from 'components/common/Layout'
import SEO from 'components/common/Seo'
import { Container, Button } from '@material-ui/core'

export default () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div
      className="container center-text"
      style={{ backgroundColor: '#e9ecef' }}
    >
      <Container maxWidth="xs">
        <h2>Welcome to CitSci Earth</h2>
        <p>
          CitSci Earth lets you share your datasets with people and
          organizations across the world. Contributors receive attributions
          whenever their datasets are published by a community.
        </p>
      </Container>
      <Button variant="contained" style={{ backgroundColor: 'green' }}>
        Sign Up
      </Button>
      <Container maxWidth="xs" style={{ marginTop: `1.5rem` }}>
        <p>
          Get an invite from a citizen science project or start your own project
          and join our movement to save the environment from climate change.
        </p>
      </Container>
    </div>
  </Layout>
)
