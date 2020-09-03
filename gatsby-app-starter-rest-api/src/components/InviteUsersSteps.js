import React from 'react'
import { ProjectContext } from './ProjectContext'
import { DropzoneDialog } from 'material-ui-dropzone'
import { Grid, 
         Typography,
         Button,
         Select,
         MenuItem } from '@material-ui/core'

export default class InviteUsers extends React.Component {
  state = {
    dropOpen: false,
    upload: []
  }

  static contextType = ProjectContext

  componentDidMount() {
    this.setState({
      dropOpen: false,
      upload: []
    })
  }

  handleSave(files) {
    this.setState({
      upload: files,
      dropOpen: false
    })
    // TODO: send to S3 and get key back and give to context
    this.context.setInviteKey("key")
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    return (
      <ProjectContext.Consumer>
        { value => ( 
          <Grid container spacing={3}>  
            <Grid item xs={6}>
              <Typography variant='h6' gutterBottom>
                Download Invitation Template
              </Typography>
              <Button
                variant="contained"
                style={{ marginLeft: '.25rem', 
                         backgroundColor: `#3EC28F`, 
                         color: 'white' }}>
                Download
              </Button>
            </Grid>
            <Grid item xs={6}>
              <br/>
              <Typography variant='body2'>
                Download the CSV template to add the name and email IDs of the users.
                Please ensure that you invite users above the age of 18.
                Users below the age of 18 will require parental supervision and consent
                before being added into a project.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6' gutterBottom>
                Invite Users
              </Typography>
              <Button
                variant="contained" 
                onClick={() => this.setState({dropOpen: true})}
                style={{marginLeft: '.25rem', marginBottom: '.5rem', 
                        backgroundColor: `#3EC28F`, color: 'white' }}
              >
                Upload CSV Template
              </Button>
              <DropzoneDialog
                open={this.state.dropOpen}
                onClose={() => this.setState({dropOpen: false})}
                onSave={this.handleSave.bind(this)}
                showPreviews={false}
                showPreviewsInDropzone={true}
                filesLimit={1}
              >
              </DropzoneDialog>
              </Grid>
            <Grid item xs={6}>
              <br/>
              <Typography variant='body2'>
                Once you upload the user invitation template, the system will share
                how many users are added into the project. When you click on next,
                an email invitation with a link will be sent to the users.
                People can click on that link and start contributing datasets.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6' gutterBottom>
                Add User Groups
              </Typography>
              <Select
                variant="outlined"
                defaultValue=""
                // value={this.state.license}
                // onChange={this.changeLicense}
                name="userGroups"
                displayEmpty
              >
                <MenuItem value="">Add existing users</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <br/><br/>
              <Typography variant='body2'>
                Options to add/create user groups will be developed later.
              </Typography>            
            </Grid>
          </Grid>
        )}
      </ProjectContext.Consumer>
    )
  }
}