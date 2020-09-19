import React from 'react'
import { Link } from 'gatsby'
import styles from './pagestyles.modules.css'
import SEO from 'components/common/Seo'
import transpLogo from 'images/CitSciEarth-Transparent.png'
import SignUpForm from 'components/common/SignUpForm'
import AppWrapper from 'components/AppWrapper'
import Context from 'components/common/Context'
import { Container, Grid, Divider, Typography } from '@material-ui/core'

function LandingGridItem(props) {
  return (
    <Grid item xs={6}>
      <Link to={props.to}>
        <Typography variant="h6" align="left" color="textPrimary">
          {props.title}
        </Typography>
        <Typography variant="body2" align="left" color="textPrimary">
          {props.subtitle}
        </Typography>
      </Link>
    </Grid>
  )
}

export default class Products extends React.Component {
  render() {
    return (
      <AppWrapper noPad={true}>
        <SEO title="Home" keywords={[`greendubs`, `citsci`, `sarjom`]} />
        <div
              className="container center-text"
              style={{ backgroundColor: '#e9ecef' }}
            >
        <Context.Consumer>
          {context => (
            <>
              <br/>
              {/*console.log(
                context.data.isLoggedIn
              ) access data from context*/}
              <Container maxWidth="xs">
                <img src={transpLogo} height='156px' width='200px' style={{marginBottom: '0px'}}/>
                <Typography variant='body1' align='center' gutterBottom>
                  CitSci Earth lets you share your datasets and research with people and
                  organizations across the world. Contributors receive
                  attributions whenever their datasets are published by a
                  community.
                </Typography>
                <SignUpForm />
                <Typography variant="body2" gutterBottom>
                  Sign up today to get an invite. Join our movement to help collect about
                  your local environment.
                </Typography>
              </Container>
              <Container maxWidth="sm" style={{ marginTop: `1.5rem` }}>
                <Typography variant="caption" gutterBottom>
                  Get an invite from a citizen science project or start your own
                  project and join our movement to save the environment from
                  climate change.
                </Typography>
              </Container>

              <Container maxWidth="sm">
                <Divider />
                <br />
                <Grid container spacing={3}>
                  <LandingGridItem
                    to="/about-citsci"
                    title="Citizen Science"
                    subtitle="Learn about citizen science and contribute valuable data
                    about our environment."
                  />
                  <LandingGridItem
                    to="/data-licenses"
                    title="Data Licenses"
                    subtitle="Know your data rights and receive attributions/acknowledgments
                    for your contributions."
                  />
                  <LandingGridItem
                    to="/app/send/project" //TODO: have this path be dependent on isLoggedIn
                    title="Send Data"
                    subtitle="Click here to send data to your citizen science projects."
                  />
                  <LandingGridItem
                    to="/data-privacy"
                    title="Data Privacy"
                    subtitle="Learn about privacy and how we manage and secure your data."
                  />
                  <LandingGridItem
                    to="/app/collect" //TODO: have this path be dependent on isLoggedIn
                    title="Collect Data"
                    subtitle="Click here to connect, manage, and publish your citizen science projects."
                  />
                  <LandingGridItem
                    to="/terms-conditions"
                    title="Terms & Conditions"
                    subtitle="By using this site, you agree to the terms and conditions set forward here."
                  />
                </Grid>
                {/* <Link to='/app/organizations'>org shortcut</Link> */}
              </Container>
            </>
          )}
        </Context.Consumer>
        <br/>
        </div>
      </AppWrapper>
    )
  }
}
