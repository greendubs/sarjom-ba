import React from 'react'
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
import SEO from 'components/common/Seo'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'

import {
  Container,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField,
} from '@material-ui/core'

export default class SendCompleteForm extends React.Component {
  state = {
    open: false,
    feedback: '',
  }

  componentDidMount() {
    this.setState({
      open: false,
      feedback: '',
    })
  }

  handleClickOpen() {
    this.setState({
      open: true,
    })
  }

  handleClose() {
    this.setState({
      open: false,
    })
  }

  handleTFChange = e => {
    this.setState({
      feedback: e.target.value,
    })
  }

  sendFeedback() {
    console.log(this.state.feedback)
    this.setState({
      open: false,
    })
  }

  render() {
    return (
      <>
        <SEO title="Data Sent!" />
        <Breadcrumbs separator=">>" aria-label="breadcrumb">
          <Link color="inherit" to="/">
            Home
          </Link>
          <Link color="textPrimary" to="/app/send" aria-current="page">
            Send Data
          </Link>
        </Breadcrumbs>
        <Container maxWidth="sm">
          <Typography variant="h5" align="center" gutterBottom>
            Thank You!
          </Typography>
          <br />
          <Typography variant="body2" align="center" gutterBottom>
            Your data is on its way!
          </Typography>
          <Typography variant="body2" align="center" gutterBottom>
            We will soon be building a dashboard for you and we need your
            support, ideas and words of encouragement. Preview it below!
          </Typography>
          <Typography align="center" gutterBottom>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#3EC28F',
                color: 'white',
                marginLeft: '0px',
              }}
              onClick={() => navigate('/app/send/dashboard')}
            >
              Sender Dashboard
            </Button>
          </Typography>
          <br />
          <Typography variant="body2" align="center" gutterBottom>
            Let us know what you think!
          </Typography>
          <br />
          <Typography align="center" gutterBottom>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#3EC28F',
                color: 'white',
                marginLeft: '0px',
              }}
              onClick={() => this.handleClickOpen()}
            >
              Send Message
            </Button>
          </Typography>
          <br />
          <Typography align="center" gutterBottom>
            <Button
              variant="contained"
              style={{
                backgroundColor: '#3EC28F',
                color: 'white',
                marginLeft: '0px',
              }}
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Typography>
          <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
              <Typography variant="h5" align="left">
                Feedback
              </Typography>
            </DialogTitle>
            <DialogContent>
              <TextField
                multiline
                variant="outlined"
                margin="dense"
                id="contact"
                type="text"
                fullWidth
                ref="feedback"
                onChange={this.handleTFChange}
              />
              <DialogContentText>
                <Typography variant="body1" gutterBottom align="center">
                  Send us a message and let us know what you think!
                </Typography>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={() => this.handleClose()}>
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{
                  backgroundColor: '#3EC28F',
                  margin: '1rem',
                  color: 'white',
                }}
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
