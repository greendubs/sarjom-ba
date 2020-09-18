import React from 'react'
import { Link } from 'gatsby'
import CardSet from 'components/common/CardSet'
import SEO from 'components/common/Seo'
import logo from './../images/CitSciEarth-BlackBG.png'
import { Container,
         Typography,
         Button,
         Grid } from '@material-ui/core'

export default class OrganizationProfile extends React.Component {
  state = {
    name: "",
    address: "",
    contact: "",
    image: "",
    projects: []
  }

  componentDidMount() {
    this.setState({
      name: "Organization Name",
      address: "Address",
      contact: "Contact Info",
      image: "",
      projects: [
        { name: "Sample Name", organisation: { name: "Project Description"}, },
        { name: "Sample Name", organisation: { name: "Project Description"}, },
      ]
    })
  }

  dummy() {
    console.log('dummy')
  }

  render() {
    return (
      <>
        <SEO title={this.state.name}/>
        <Container maxWidth='lg' style={{ backgroundColor: '#e9ecef' }}>
          <br/>
          <Container maxWidth='sm'>
          <Typography variant='h5' align='center' gutterBottom style={{marginBottom: '1rem'}}>
            Organization View
          </Typography>
          <Typography variant='subtitle2' align='center' gutterBottom style={{marginBottom: '1rem'}}>
            This page is currently under development. 
            But you can view how some of the projects will be hosted on our platform.
          </Typography>
          </Container>
          <br/>
          <Container maxWidth='sm'>
            <Grid container spacing={5}>
              <Grid item xs={3} style={{padding: '.5rem'}}>
                <img src={logo} height='100px' width='100px'/>
              </Grid>
              <Grid item xs={7} style={{paddingTop: '.25rem'}}>
                <Typography variant='subtitle1' gutterBottom>
                  {this.state.name}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {this.state.address}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {this.state.contact}
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth='md'>
            <CardSet 
              cards={this.state.projects}
              button1={{label: 'Attachments', function: () => this.dummy()}}
              button2={{label: 'Sign-Up', function: () => this.dummy()}}/>
          </Container>
          <br/>
        </Container>
        <Typography variant='body2' align='center' gutterBottom style={{margin: '1rem'}}>
          List your citizen science projects/organization in our directory so that more people can find and join your work.
        </Typography>
        <Typography align='center' gutterBottom style={{margin: '1rem'}}>
          <Link to='/join-us'>
            <Button variant='contained' style={{ backgroundColor: `#3EC28F`, color: 'white'}}>
              Join Us
            </Button>
          </Link>
        </Typography>
      </>
    )
  }
}