import React from 'react'
import { UploadProjectContext } from './UploadProjectContext'
import {
  Grid,
  Typography,
  Chip,
  Button,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { DropzoneDialog } from 'material-ui-dropzone'
import { filesConfig } from './Keys'
import S3 from 'react-aws-s3'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

export default class UploadMetaData extends React.Component {
  state = {
    fileType: '',
    files: [],
    drop: false,
  }

  static contextType = UploadProjectContext

  componentDidMount() {
    this.setState({
      drop: false,
    })
  }

  handleSFChange = e => {
    // console.log(e.target.value)

    this.setState({ fileType: e.target.value })
    this.context.setMetaFileType(e.target.value)

    //console.log(this.state)
    //  console.log(this.context)
  }

  handleSave(files) {
    const ReactS3Client = new S3(filesConfig)
    let promises = []
    let fileNames = []
    let fileLinks = []
    let fileHeaders = {}

    files.forEach(file => {
      // console.log(file)
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
    //Currently, reading the entire file and extracting header. This needs to be optimized to read only header for better performance.
    Promise.all(
      files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.addEventListener('load', ev => {
            resolve(ev.target.result.split('\n').shift())
            //console.log(ev.target.result.split('\n').shift())
          })
          reader.addEventListener('error', reject)
          reader.readAsText(file)
        })
      })
    )
      .then(headers => {
        //console.log(headers)
        //console.log(fileNames)
        headers.map((header, index) => {
          fileHeaders[fileNames[index]] = header.split(',')
        })
        // console.log(fileHeaders)
      })
      .catch(error => {
        console.log(error)
        fileHeaders = {}
      })

    this.setState({
      files: fileNames,
      drop: false,
      //fileHeaders: fileHeaders,
    })
    this.context.setMetaFileNames(fileNames)
    this.context.setMetaFileLinks(fileLinks)
    this.context.setMetaFileHeaders(fileHeaders)
  }

  deleteChip(index) {
    //Files will not be deleted from s3 bucket. This needs to be discussed.
    let fileName = this.state.files[index]
    // console.log(fileName)

    let updatedFiles = this.state.files.filter((_, i) => i !== index)
    this.setState({
      files: updatedFiles,
    })
    this.context.setMetaFileNames(updatedFiles)

    let updatedLinks = this.context.metaFileLinks.filter((_, i) => i !== index)
    this.context.setMetaFileLinks(updatedLinks)

    const { [fileName]: _, ...updatedHeaders } = this.context.metaFileHeaders
    this.context.setMetaFileHeaders(updatedHeaders)
    // console.log(this.state)
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
                  Attach Metadata
                  <ErrorOutlineIcon
                    color="disabled"
                    fontSize="small"
                    style={{ marginLeft: '.5rem' }}
                  />
                </Grid>
              </Typography>
              <FormControl variant="outlined" style={{ minWidth: 200 }}>
                <InputLabel id="metafile-type-label">
                  Select Type of Files
                </InputLabel>
                <Select
                  variant="outlined"
                  value={this.state.fileType}
                  onChange={this.handleSFChange}
                  name="fileType"
                  label="Select Type of Files"
                  id="metafile-type"
                >
                  <MenuItem value="CSV">CSV</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <br />
              <Typography variant="body2">
                Select and upload all the meta data files (upto 2GB) that you
                want to associate to your project.
                <br />
                <br />
                Currently, we accept only CSV files (upto 2GB) with single row
                headers. Filenames must be unique and relevant and will be used
                to fetch headers for mapping.
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
                Upload Metadata
              </Button>
              <DropzoneDialog
                open={this.state.drop}
                onClose={() => this.setState({ drop: false })}
                onSave={this.handleSave.bind(this)}
                maxFileSize={2000000000}
                dropzoneText={'Drag and drop files here or click'}
                acceptedFiles={['.csv', '.xlsx', '.xls']}
                filesLimit={10}
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
