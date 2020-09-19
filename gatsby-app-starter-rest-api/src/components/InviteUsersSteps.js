import React from 'react'
import { ProjectContext } from './ProjectContext'
import { DropzoneDialog } from 'material-ui-dropzone'
import { Grid, 
         Typography,
         Button,
         Select,
         MenuItem } from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { inviteConfig } from './Keys'
import S3 from 'react-aws-s3'

export default class InviteUsers extends React.Component {
  state = {
    dropOpen: false,
    uploaded: false
  }

  static contextType = ProjectContext

  componentDidMount() {
    this.setState({
      dropOpen: false,
      uploaded: false
    })
  }

  handleSave(files) {
    let file = files[0]
    this.setState({
      uploaded: true,
      dropOpen: false
    })

    console.log(file)
    const ReactS3Client = new S3(inviteConfig)
    // TODO: change front tag to formatted project name
    ReactS3Client
      .uploadFile(file, ('testproject/').concat(file.name.substring(0, file.name.indexOf('.'))))
      .then(data => {
              console.log(data)
              this.context.setInviteKey(data.key)})
      .catch(err => {
              console.log(err);
              this.setState({
                uploaded: false
              })
      })
  }

  componentDidUpdate() {
    //console.log(this.state)
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
              <a href="https://sarjom-user-invitations.s3-us-west-2.amazonaws.com/user-invitation.csv" download>
                <Button
                  variant="contained"
                  style={{ marginLeft: '.25rem', 
                          backgroundColor: `#3EC28F`, 
                          color: 'white' }}
                >
                  Download
                </Button>
              </a>
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
                <Grid container direction='row' alignItems='center'>
                Invite Users
                <ErrorOutlineIcon  color='disabled' fontSize='small' style={{ marginLeft: '.5rem'}}/>
                </Grid>
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
              { this.state.uploaded &&
                (<Typography variant='body2' style={{marginLeft: '.5rem'}}>
                  Email Template Uploaded
                </Typography>)
              }
              
            </Grid>
            <Grid item xs={6}>
              <br/>
              <Typography variant='body2'>
                After you upload the file and click on next,
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