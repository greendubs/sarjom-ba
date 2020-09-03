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
            <Typography variant='body1' gutterBottom='true'>
            Citsci Earth is currently in beta development and is currently invite only.
            Please complete the form below and we will reach out to you to setup your organization and projects.
            </Typography>
            <Typography variant='body1' align='left' gutterBottom='true'>
              <div>- Looking to join a citizen science project?</div>
              <div>- Looking to develop or host your own citizen science projects?</div>
              <div>- Looking to start your own neighborhood, school, university project?</div>
              <div>- Anything else? Like feedback/comments/reviews/suggestions?</div>
            </Typography>
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            margin='dense'
            id='description'
            type='text'
            fullWidth
            variant='outlined'
            placeholder='Enter a brief description of your requirements/interests(250 words)'
            onChange={handleDesc}
            />
          <TextField
            
            margin='dense'
            id='contact'
            type='text'
            fullWidth
            placeholder='Enter your email ID and contract details'
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
    </div>
  )
}