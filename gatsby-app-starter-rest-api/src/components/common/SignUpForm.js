import React from 'react'
import axios from 'axios'
import {Button,
        TextField,
        Dialog,
        DialogActions,
        DialogContent,
        DialogContentText,
        DialogTitle,
        Typography} from '@material-ui/core'

export default function SignUpForm() {
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [desc, setDesc] = React.useState("");
  const [email, setEmail] = React.useState("")

  //TODO: send data after submission, see Form.js
  const handleClickOpen = () => {
      setOpen(true);
  }

  const handleClose = () => { 
    setOpen(false);
  }

  const submit = () => {
    console.log(desc)
    console.log(email)
    var axios = require('axios');
    var data = JSON.stringify({"description":desc,"emailList":email});

    var config = {
      method: 'post',
      url: `${process.env.API}/sign-up-interest`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    handleClose()
    setSuccess(true)

  }

  const handleDesc = (e) => {
    setDesc(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  return (
    <div>
      <Button
          variant="contained"
          size="medium"
          style={{
            backgroundColor: '#3EC28F',
            marginLeft: '0px',
            color: 'white',
            margin: '1rem'
          }}
          onClick={handleClickOpen}
        >
          Sign Up
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Typography variant='h5' align='center'>
            Sign-Up Form
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant='body1' gutterBottom='true' style={{color: 'black'}}>
            Citsci Earth is currently in beta development and we are presently invite only.
            We follow a communitry driven design process to build the open source tools and technologies for environment.
            Hence if you would like to get involved, please let us know!
            We are always happy to work with a diverse set of stakeholders.
            </Typography>
            <Typography variant='body1' align='left' gutterBottom='true' style={{color: 'black'}}>
              <div>- Looking to join a citizen science project?</div>
              <div>- Looking to develop or host your own citizen science projects?</div>
              <div>- Looking to start your own neighborhood, school, university project?</div>
              <div>- Anything else? Like feedback/comments/reviews/suggestions?</div>
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            rows={6}
            margin='dense'
            id='description'
            type='text'
            fullWidth
            variant='outlined'
            style={{ backgroundColor: '#e9ecef' }}
            placeholder='A brief description of your interests(250 words)'
            onChange={handleDesc}
            />
          <TextField
            
            margin='dense'
            id='contact'
            type='text'
            fullWidth
            variant='outlined'
            style={{ backgroundColor: '#e9ecef' }}
            placeholder='Email ID or contact details'
            onChange={handleEmail}
            />
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained"
          
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#3EC28F',
              margin: '1rem',
              color: 'white'}} 
            onClick={submit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={success}>
        <DialogContent>
          <Typography variant='body1' gutterBottom='true' align='center'>
            Thank you for your message. A team member will reach out to you soon.
            For any follow up, you can write to us at <a>hello@citsci.earth</a>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained"
            onClick={() => setSuccess(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}