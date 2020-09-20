import React from 'react'
import Layout from 'components/common/Layout'
import SEO from 'components/common/Seo'
import SignUpForm from 'components/common/SignUpForm'
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles'
import ReactPlayer from 'react-player'
import { Container,
         Typography,
         Grid,
         GridList,
         GridListTile,
         Button,
         Card,
         CardContent,
         Avatar } from '@material-ui/core'


export default class Feedback extends React.Component {
  state = {
    feedbacks: []
  }

  componentDidMount() {
    this.setState({
      feedbacks: [
        {user: "Person's Name", details: "Organization Name + Project Name", description: "Feedback - text"},
        {user: "Person's Name", details: "Organization Name + Project Name", description: "Feedback - text"},
        {user: "Person's Name", details: "Organization Name + Project Name", description: "Feedback - text"},
      ]
    })
  }

  render() {
    return (
      <>
      <Layout>
      <SEO title="Feedback"/>
      <Container maxWidth='lg' style={{ backgroundColor: '#e9ecef' }}>
        <br/>
        <Container maxWidth='sm'>
          <Typography variant='h5' align='center' gutterBottom style={{marginBottom: '1rem'}}>
            Feedback View
          </Typography>
          <Typography variant='subtitle2' align='center' gutterBottom style={{marginBottom: '1rem'}}>
            This page is currently under development. 
            But you can view what some users have to say about our platform here.
          </Typography>
        </Container>
        <Container maxWidth='md'>
          <Typography variant='h6' align='center' gutterBottom style={{marginBottom: '1rem'}}>
            A message from our community partner
          </Typography>
          <Container align='center'>
            <ReactPlayer url='https://www.youtube.com/watch?v=mR_1WfUQ2z4' controls={true}/>
          </Container>
          <br/>
          <Typography variant='h6' align='center' gutterBottom style={{marginBottom: '1rem'}}>
            Our Impact
          </Typography>
          <Container maxWidth='sm'>
            <Typography variant='body2' gutterBottom style={{marginBottom: '1rem'}}>
              <p>
              Our open source tools and platform will empower community organizations across the world to collect
              valuable data about our environment and help the community take data-backed decisions about their environment.
              </p>
              <p>
              We are looking for more community partners, not-for-profit, reaserchers who can benefit from our work.
              Please feel free to reach out to us.
              </p>
            </Typography>
          </Container>
          <Container align='center'>
            <SignUpForm/>
          </Container>
          <GridList cols={1} spacing={1} cellHeight={200}>
            {this.state.feedbacks.map((feedback) => (
              <GridListTile style={{marginBottom: '0px'}}>
                <Card style={{ padding:'.5rem' }}>
                  <Grid container
                    spacing={3}
                    >
                    <Grid item xs={2}>
                      <CardContent align='center'> 
                        <Avatar 
                            style={{  height: '70px', width: '70px', backgroundColor: `#3EC28F`, marginTop: '.5rem', marginBottom: '.5rem'  }}
                          >
                            {' '}
                            {feedback.user.charAt(0).toUpperCase()}
                          </Avatar>
                      </CardContent> 
                    </Grid>
                    <Grid item xs={8}>
                      <CardContent>
                        <Typography variant="h6"> 
                          {feedback.user}
                        </Typography>
                        <Typography variant="body2" gutterBottom> 
                          {feedback.details}
                        </Typography>
                        <Typography variant="body2" gutterBottom> 
                          {feedback.description}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>  
                </Card>
              </GridListTile>
            ))}
          </GridList>
        </Container>
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
        </Layout>
      </>
    )
  }
}