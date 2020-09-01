import React from 'react'
import { navigate } from '@reach/router'
import axios from 'axios'
import SEO from './common/Seo'
import Context from './common/Context'
import { Container, 
         Button,
         Typography,
         Dialog,
         DialogTitle,
         DialogContent,
         DialogActions,
         DialogContentText,
         TextField} from '@material-ui/core'

export default class ProjectCreated extends React.Component {
  state = {
    open: false,
    createdProject: "",
    feedback: ""
  }

  componentDidMount() {
    this.setState({
      open: false,
      createdProject: window.history.state.createdProject,
      feedback: ""
    })
  }

  handleClickOpen() {
    this.setState({
      open: true
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  handleTFChange = (e) => {
    this.setState({
      feedback: e.target.value
    })
  }

  sendFeedback() {
    console.log(this.state.feedback)
    this.setState({
      open: false
    })
  }

  render() {
    return (
      <>
      <SEO title="Project Created!"/>
      <Container maxWidth='sm'>
        <Typography variant='h5' align='center' gutterBottom>
          Thank You!
        </Typography>
        <br/>
        <Typography variant='body2' align='center' gutterBottom>
          Your project <b>{this.state.createdProject}</b> has been added and
          invitations to users are on its way. We will soon be building
          a directory on our site where your organization profile and
          projects will be listed for users to sign up. 
        </Typography>
        <br/>
        <Typography variant='body2' align='center' gutterBottom>
          Let us know what you think!
        </Typography>
        <br/>
        <Typography align='center' gutterBottom>
          <Button 
            variant="contained"
            style={{backgroundColor: '#3EC28F', color: 'white', marginLeft: '0px'}}
            onClick={() => this.handleClickOpen()}
          >
            Send Message
          </Button>
        </Typography>
        <br/>
        <Typography align='center' gutterBottom>
          <Button 
            variant="contained"
            style={{backgroundColor: '#3EC28F', color: 'white', marginLeft: '0px'}}
            onClick={() => navigate('/app/collect')}
          >
            Back to Dashboard
          </Button>
        </Typography>
        <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <Typography variant='h5' align='left'>
              Feedback
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              multiline
              variant='outlined'
              margin='dense'
              id='contact'
              type='text'
              fullWidth
              ref="feedback"
              onChange={this.handleTFChange}
              />
            <DialogContentText>
              <Typography variant='body1' gutterBottom align='center'>
                Send us a message and let us know what you think!
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              variant="contained"
              onClick={() => this.handleClose()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#3EC28F',
                margin: '1rem',
                color: 'white'}} 
              onClick={() => this.sendFeedback()}
            >
                Send
            </Button>
          </DialogActions>
        </Dialog> 
      </Container>
      </>
    )
  }
}