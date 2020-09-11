import React, { useContext } from 'react'
import {Button,
        TextField,
        Dialog,
        DialogActions,
        DialogContent,
        DialogContentText,
        DialogTitle,
        Typography} from '@material-ui/core'
import Context from 'components/common/Context'


export default function FeedbackForm() {
  const [open, setOpen] = React.useState(false)
  const [comments, setComments] = React.useState("")
  const { data } = useContext(Context)
  const meta = data

  const handleClickOpen = () => {
      setOpen(true);
  }

  const handleClose = () => { 
    setOpen(false);
  }

  const submit = () => {
    var axios = require('axios');
    var data = JSON.stringify({"comments":comments});

    var config = {
      method: 'post',
      url: `${process.env.API}/feedbacks`,
      headers: { 
        'token': meta.token, 
        'tokenId': meta.tokenId, 
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

  const handleComments = (e) => {
    setComments(e.target.value)
  }

  return(
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
        Send a Message
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <Typography variant='h5' align='center'>
          Feedback Form
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography variant='body1' gutterBottom='true'>
          This site is still in beta development, please let us know what you think of the
          site so far!
          </Typography>
        </DialogContentText>
        <TextField
          multiline
          margin='dense'
          id='description'
          type='text'
          fullWidth
          variant='outlined'
          onChange={handleComments}
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