import React from 'react'
import { Link } from 'gatsby'
import styles from './pagestyles.modules.css'
import Layout from 'components/common/Layout'
import SEO from 'components/common/Seo'
import { Container, Button, Grid, Divider, Typography } from '@material-ui/core'

export default () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div
      className="container center-text"
      style={{ backgroundColor: '#e9ecef' }}
    >
      <Container maxWidth="xs">
        <h1>Welcome to CitSci Earth</h1>
        <p>
          CitSci Earth lets you share your datasets with people and
          organizations across the world. Contributors receive attributions
          whenever their datasets are published by a community.
        </p>
        <Button variant="contained" style={{ backgroundColor: 'green' }}>
          Sign Up
        </Button>
        <Container maxWidth="xs" style={{ marginTop: `1.5rem` }}>
          <Typography variant="caption" gutterBottom={true}>
            Get an invite from a citizen science project or start your own project
            and join our movement to save the environment from climate change.
          </Typography>
        </Container>
      </Container>
      <Container maxWidth='sm'>
        <Divider/>
        <br/>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Link to='/about'>
              <Typography variant="h6" align='left' color='textPrimary'>
                Citizen Science
              </Typography>
              <Typography variant='subtitle2' align='left' color='textPrimary'>
                Learn about citizen science and contribute valuable data
                about our environment.
              </Typography>
            </Link>   
          </Grid>
          <Grid item xs={6}>
            <Link to='/about'>
              <Typography variant="h6" align='left' color='textPrimary'>
                Data Licences
              </Typography>
              <Typography variant='subtitle2' align='left' color='textPrimary'>
                Know your data rights and receive attributions/acknowledgments
                for your contributions.
              </Typography>
              </Link>
          </Grid>

          <Grid item xs={6}>
            <Link to='/about'>
              <Typography variant="h6" align='left' color='textPrimary'>
                Send Data
              </Typography>
              <Typography variant='subtitle2' align='left' color='textPrimary'>
                Click here to send data to your citizen science projects.
              </Typography>
            </Link>   
          </Grid>
          <Grid item xs={6}>
            <Link to='/about'>
              <Typography variant="h6" align='left' color='textPrimary'>
                Data Privacy
              </Typography>
              <Typography variant='subtitle2' align='left' color='textPrimary'>
                Learn about privacy and how we manage and secure your data.
              </Typography>
              </Link>
          </Grid>
          
          <Grid item xs={6}>
            <Link to='/about'>
              <Typography variant="h6" align='left' color='textPrimary'>
                Collect Data
              </Typography>
              <Typography variant='subtitle2' align='left' color='textPrimary'>
                Click here to connect, manage, and publish your citizen science projects.
              </Typography>
            </Link>   
          </Grid>
          <Grid item xs={6}>
            <Link to='/about'>
              <Typography variant="h6" align='left' color='textPrimary'>
                Terms and Conditions
              </Typography>
              <Typography variant='subtitle2' align='left' color='textPrimary'>
                By using this site, you agree to the terms and conditions set forward here
              </Typography>
              </Link>
          </Grid> 
        </Grid>
      </Container>
    </div>
  </Layout>
)
