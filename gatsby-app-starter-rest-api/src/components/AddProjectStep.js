import React from 'react'
import { ProjectContext } from './ProjectContext'
import { Grid,
         Container,
         TextField, 
         Typography, 
         Button,
         Chip } from '@material-ui/core'
import { DropzoneDialog } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles'

export default class AddProject extends React.Component {
  // const  context  = useContext(ProjectContext)
  // const [drop1, setDrop1] = useState(false)
  // const [drop2, setDrop2] = useState(false)
  // const classes = useStyles();
  state = {
    desc: "",
    drop1: false,
    drop2: false,
    files1: [],
    files2: []
  }

  static contextType = ProjectContext
  static sizeLimit = 2000000000

  componentDidMount() {
    this.setState({
      desc: this.context.description,
      drop1: false,
      drop2: false,
      files1: this.context.documentLinks,
      files2: this.context.bannerLink
    })
    console.log(this.context)
  }

  handleDescChange = (e) => {
    //console.log(this.context)
    this.context.setDescription(e.target.value.substring(0, 200))
  }

  handleSave1(files) {
    this.setState({
      files1: files,
      drop1: false
    })
    //we'll need to contact the buckt here and get links to the docs,
    // thes links will be what we actually set inside of the context to 
    //be given to the context later
    this.context.setDocLinks(files)
  }

  handleSave2(files) {
    this.setState({
      files2: files,
      drop2: false
    })
    //see save1 comment
    this.context.setBannerLink(files)
  }

  deleteChip(index) {
    let updated = this.state.files1.filter((_, i) => i !== index)
    this.setState({
      files1: updated
    })
    this.context.setDocLinks(updated)
  }

  removeBanner() {
    this.setState({
      files2: []
    })
    this.context.setBannerLink("")
  }

  componentDidUpdate() {
    //console.log(this.state)
  }

  render() {
  return (
    // <ProjectContext.Consumer>
    //   { value => ( 
        <Grid container spacing={3}> 
          {/* {console.log(value)}  */}
          <Grid item xs={6} >
            <Typography variant='h6'>
              Project Description
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
              showPreviews={false}
              showPreviewsInDropzone={true}
              maxFileSize={this.sizeLimit}
              filesLimit={10}
            >
            </DropzoneDialog>
            <br/>
            <div>
              {this.state.files1.map((file, index) => (
                <Chip
                  size='small'
                  label={file.name}
                  onDelete={() => this.deleteChip(index)}
                  style={{margin: '.5rem', backgroundColor: '#3EC28F', color: 'white'}}
                >
                </Chip>
              ))}
            </div>
          </Grid>
          <Grid item xs={6}>
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
              maxFileSize={this.sizeLimit}
              filesLimit={1}
            >
            </DropzoneDialog>
            <br/>
            <div>
              {this.state.files2.map((file) => (
                <Chip
                  size='small'
                  label={file.name}
                  onDelete={() => this.removeBanner()}
                  style={{margin: '.5rem', backgroundColor: '#3EC28F', color: 'white'}}
                >
                </Chip>
              ))}
            </div>            
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2'>
              All details added here will be visible in our public directory
              and visible to everyone.
            </Typography>
          </Grid>
        </Grid>
    //   )}
    // </ProjectContext.Consumer>
  )
  }
}