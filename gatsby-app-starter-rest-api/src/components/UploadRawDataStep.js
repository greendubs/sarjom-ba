import React from 'react'
import { UploadProjectContext } from './UploadProjectContext'
import {
  Grid,
  Typography,
  Chip,
  Button,
  Select,
  MenuItem,
  Checkbox,
  TextField,
} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { DropzoneDialog } from 'material-ui-dropzone'
import { filesConfig } from './Keys'
import S3 from 'react-aws-s3'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

export default class UploadRawData extends React.Component {
  state = {
    rawFileType: '',
    indexes: ['File Names, File Locations', 'DateTime Stamp'],
    checkbox1: true,
    checkbox2: true,
    checkbox3: true,
    files: [],
    drop: false,
  }

  static contextType = UploadProjectContext

  componentDidMount() {
    this.setState({
      rawFileType: this.context.rawFileType,
      //indexes: new Set(['File Names, File Locations', 'DateTime Stamp']),
      checkbox1: true,
      checkbox2: true,
      checkbox3: true,
      fileNames: this.context.rawFileNames,
      fileLinks: this.context.rawFileLinks,
      drop: false,
    })
    // remove this when more licenses available
    //this.context.setRawFileType('')
    this.context.setRawDataIndexes([
      'File Names',
      'File Locations',
      'DateTime Stamp',
    ])
  }

  addItem(item) {
    // console.log(item)
    const newIndexes = [...this.state.indexes, item]
    // console.log(newIndexes)
    this.setState(
      {
        indexes: newIndexes,
      },
      () => this.context.setRawDataIndexes(this.state.indexes)
    )
    // console.log(this.state)
  }

  removeItem(item) {
    const newIndexes = this.state.indexes.filter(_ => _ !== item)
    this.setState(
      {
        indexes: newIndexes,
      },
      () => this.context.setRawDataIndexes(this.state.indexes)
    )
    //  console.log(this.state)
  }

  handleCBChange = e => {
    // console.log(e.target)
    //  console.log(e.target.name, e.target.checked)
    if (e.target.name === 'checkbox1') {
      this.setState({ checkbox1: e.target.checked })
      if (e.target.checked) {
        this.addItem('File Names')
      } else {
        this.removeItem('File Names')
      }
    } else if (e.target.name === 'checkbox2') {
      this.setState({ checkbox2: e.target.checked })
      if (e.target.checked) {
        this.addItem('File Locations')
      } else {
        this.removeItem('File Locations')
      }
    } else if (e.target.name === 'checkbox3') {
      this.setState({ checkbox3: e.target.checked })
      if (e.target.checked) {
        this.addItem('DateTime Stamp')
      } else {
        this.removeItem('DateTime Stamp')
      }
    }
    // console.log(this.state.indexes)
    //console.log(this.context)
  }

  handleSFChange = e => {
    this.setState({
      rawFileType: e.target.value,
    })
    this.context.setRawFileType(e.target.value)
  }

  handleSave(files) {
    const ReactS3Client = new S3(filesConfig)
    let promises = []
    let fileNames = []
    let fileLinks = []
    files.forEach(file => {
      fileNames.push(file.name)
      // TODO: change front tag to formatted project name
      promises.push(
        ReactS3Client.uploadFile(
          file,
          this.context.orgId.concat(
            '_',
            this.context.projectName,
            '/',
            file.name.substring(0, file.name.indexOf('.'))
          )
        )
      )
    })

    Promise.all(promises)
      .then(results => {
        results.forEach(result => {
          fileLinks.push(result.location)
        })
      })
      .catch(err => {
        console.log(err)
        fileNames = []
        fileLinks = []
      })

    this.setState({
      files: fileNames,
      drop: false,
    })
    this.context.setRawFileNames(fileNames)
    this.context.setRawFileLinks(fileLinks)
  }

  deleteChip(index) {
    //Files will not be deleted from s3 bucket. This needs to be discussed.
    let updatedFiles = this.state.files.filter((_, i) => i !== index)
    this.setState({
      files: updatedFiles,
    })
    let updatedLinks = this.context.rawFileLinks.filter((_, i) => i !== index)
    this.context.setRawFileLinks(updatedLinks)
  }

  componentDidUpdate() {
    //console.log(this.state)
  }

  render() {
    return (
      <UploadProjectContext.Consumer>
        {value => (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                <Grid container direction="row" alignItems="center">
                  Upload Raw Data
                  {/*<ErrorOutlineIcon
                    color="disabled"
                    fontSize="small"
                    style={{ marginLeft: '.5rem' }}
                  />*/}
                </Grid>
              </Typography>
              <FormControl variant="outlined" style={{ minWidth: 200 }}>
                <InputLabel id="rawfile-type-label">
                  Select Type of Files
                </InputLabel>
                <Select
                  variant="outlined"
                  value={this.state.rawFileType}
                  onChange={this.handleSFChange}
                  name="rawFileType"
                  label="Select Type of Files"
                  id="rawfile-type"
                >
                  <MenuItem value="Images">Images</MenuItem>
                </Select>
              </FormControl>
              <Grid container direction="column">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkbox1}
                      key={1}
                      onChange={this.handleCBChange}
                      name="checkbox1"
                      style={{ color: '#3EC28F' }}
                    />
                  }
                  label="Index FileNames"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkbox2}
                      key={2}
                      onChange={this.handleCBChange}
                      name="checkbox2"
                      style={{ color: '#3EC28F' }}
                    />
                  }
                  label="Index Embedded FileLocations"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkbox3}
                      key={3}
                      onChange={this.handleCBChange}
                      name="checkbox3"
                      style={{ color: '#3EC28F' }}
                    />
                  }
                  label="Index Embedded DateTimeStamp"
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <br />
              <Typography variant="body2">
                Select and upload all the raw data files (upto 2GB) in your
                project. You should have received instructions on uploading the
                data files from your project.
                <br />
                <br />
                All datafile names(and additional metadata) can be indexed based
                on the type of files upload. Currently, we support only image
                based data processing.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                onClick={() => this.setState({ drop: true })}
                style={{
                  marginLeft: '.25rem',
                  marginBottom: '.5rem',
                  backgroundColor: '#3EC28F',
                  color: 'white',
                }}
              >
                Upload Data Files
              </Button>
              <DropzoneDialog
                open={this.state.drop}
                onClose={() => this.setState({ drop: false })}
                onSave={this.handleSave.bind(this)}
                maxFileSize={2000000000}
                dropzoneText={'Drag and drop images here or click'}
                acceptedFiles={['image/jpeg', 'image/png', 'image/jpg']}
                filesLimit={50}
              ></DropzoneDialog>
              <br />
              <div>
                {this.state.files.map((file, index) => (
                  <Chip
                    size="small"
                    label={file}
                    onDelete={() => this.deleteChip(index)}
                    style={{
                      margin: '.5rem',
                      backgroundColor: '#3EC28F',
                      color: 'white',
                    }}
                  ></Chip>
                ))}
              </div>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <br />
              <Typography variant="caption">
                <b>Alternative method-</b> For large files(more than 2GB),
                contact the help & support team. We will help you store your
                large datafiles and provide an upload code to link it to your
                mapped data.
              </Typography>
              <TextField
                variant="outlined"
                margin="dense"
                type="text"
                id="data-project-id"
                fullWidth
                defaultValue={this.context.projectId}
                name="ProjectID"
                InputProps={{
                  readOnly: true,
                }}
                // style={{ backgroundColor: '#e9ecef' }}
              />
            </Grid>
          </Grid>
        )}
      </UploadProjectContext.Consumer>
    )
  }
}
