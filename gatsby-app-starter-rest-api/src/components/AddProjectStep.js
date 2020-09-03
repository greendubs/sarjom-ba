import React from 'react'
import { ProjectContext } from './ProjectContext'
import { Grid,
         Container,
         TextField, 
         Typography, 
         Button,
         Chip } from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { DropzoneDialog } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles'
import { filesConfig } from './Keys'
import S3 from 'react-aws-s3'


export default class AddProject extends React.Component {
  state = {
    desc: "",
    drop1: false,
    drop2: false,
    files1: [],
    files2: [],
  }

  static contextType = ProjectContext

  componentDidMount() {
    this.setState({
      desc: this.context.description,
      drop1: false,
      drop2: false,
      files1: this.context.docNames,
      files2: this.context.banners,
    })
  }

  handleDescChange = (e) => {
    this.context.setDescription(e.target.value.substring(0, 200))
  }

  // need to change S3 submissions to custom folders for each project
  handleSave1(files) {
    const ReactS3Client = new S3(filesConfig);
    let promises = []
    let fileNames = []
    let docLinks = []
    files.forEach(file => {
      fileNames.push(file.name)
      // TODO: change front tag to formatted project name
      promises.push(
        ReactS3Client.uploadFile(file, 
          ('testproject/').concat(file.name.substring(0, file.name.indexOf('.'))))
      )
    })  
    
    Promise.all(promises)
      .then(results => {
        results.forEach(result => {
          docLinks.push(result.location)
        })})
      .catch(err => {
              console.log(err);
              fileNames = [];
              docLinks = [];
            })

    this.setState({
      files1: fileNames,
      drop1: false
    })
    this.context.setDocNames(fileNames)
    this.context.setDocLinks(docLinks)
  }

  handleSave2(files) {
    let banner = files[0]
    this.context.setBanners([ banner.name ])
    this.setState({
      files2: [ banner.name ],
      drop2: false
    })

    const ReactS3Client = new S3(filesConfig);
    // TODO: change front tag to formatted project name
    ReactS3Client
      .uploadFile(banner, ('testproject/').concat(banner.name.substring(0, banner.name.indexOf('.'))))
      .then(data => this.context.setBannerLink(data.location))
      .catch(err => { 
              console.log(err);
              this.setState({
                files2: []
              })
            })
  }

  //TODO: should we delete the files off of the bucket too?
  deleteChip(index) {
    let updatedFiles = this.state.files1.filter((_, i) => i !== index)
    this.setState({
      files1: updatedFiles
    })
    let updatedLinks = this.context.documentLinks.filter((_, i) => i !== index)
    this.context.setDocLinks(updatedLinks)
  }

  removeBanner() {
    this.setState({
      files2: []
    })
    this.context.setBanners([])
    this.context.setBannerLink("")
  }

  componentDidUpdate() {
    //console.log(this.state)
  }

  render() {
    return (
      <Grid container spacing={3}> 
        <Grid item xs={6} >
          <Typography variant='h6'>
            <Grid container direction='row' alignItems='center'>
            Project Description
            <ErrorOutlineIcon  color='disabled' fontSize='small' style={{ marginLeft: '.5rem'}}/>
            </Grid>
          </Typography>
          {/* TODO: make this text field a little smaller */}
          <TextField
            multiline
            margin='dense'
            inputProps={{style: {fontSize: 17}}}
            id='description'
            type='text'
            fullWidth
            variant='outlined'
            defaultValue={this.state.desc}
            placeholder='Rich text box - can embed links, urls. 200 words max'
            onChange={this.handleDescChange}
            />
        </Grid>
        <Grid item xs={6}>
          <br/>
          <br/>
          <Typography variant='body2'>
            Please add a description to the project that will be listed in our directory.
            A good description helps people identify the aims and goals of the project.
            It should also guide people towards what to expect if they decide to join your project.
          </Typography>  
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' gutterBottom> 
            Attach Documents
          </Typography>
          <Button
            variant="contained" 
            onClick={() => this.setState({drop1: true})}
            style={{marginLeft: '.25rem', marginBottom: '.5rem', }}
          >
            Upload Files
          </Button>
          <DropzoneDialog
            open={this.state.drop1}
            onClose={() => this.setState({drop1: false})}
            onSave={this.handleSave1.bind(this)}
            maxFileSize={2000000000}
            filesLimit={10}
          >
          </DropzoneDialog>
          <br/>
          <div>
            {this.state.files1.map((file, index) => (
              <Chip
                size='small'
                label={file}
                onDelete={() => this.deleteChip(index)}
                style={{margin: '.5rem', backgroundColor: '#3EC28F', color: 'white'}}
              >
              </Chip>
            ))}
          </div>
        </Grid>
        <Grid item xs={6}>
          <br/>
          <Typography variant='body2'>
            (Optional) You may add additional documents up to 2GB
            (instructions, help docs, videos, ets.) and a banner image
            for your project.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h6' gutterBottom>
            Attach Banner Image
          </Typography>
          <Button
            variant="contained" 
            onClick={() => this.setState({drop2: true})}
            style={{marginLeft: '.25rem', marginBottom: '.5rem'}}
          >
            Upload Image
          </Button>
          <DropzoneDialog
            open={this.state.drop2}
            onClose={() => this.setState({drop2: false})}
            onSave={this.handleSave2.bind(this)}
            showPreviews={false}
            showPreviewsInDropzone={true}
            maxFileSize={2000000000}
            filesLimit={1}
          >
          </DropzoneDialog>
          <br/>
          <div>
            {this.state.files2.map((file) => (
              <Chip
                size='small'
                label={file}
                onDelete={() => this.removeBanner()}
                style={{margin: '.5rem', backgroundColor: '#3EC28F', color: 'white'}}
              >
              </Chip>
            ))}
          </div>            
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body2'>
            <br/>
            All details added here will be visible in our public directory
            and visible to everyone.
          </Typography>
        </Grid>
      </Grid>
    )
  }
}