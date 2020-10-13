import React from 'react'
import SEO from './common/Seo'
import { navigate } from '@reach/router'
import axios from 'axios'
import { UploadProjectContext } from './UploadProjectContext'
import {
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container,
  Breadcrumbs,
  Dialog,
  CircularProgress,
} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Link } from 'gatsby'
import HostData from './HostDataStep'
import UploadRawData from './UploadRawDataStep'
import UploadMetaData from './UploadMetaDataStep'
import MapDataJoin from './MapDataJoinStep'
import MapDataSelect from './MapDataSelectStep'

const stepperTheme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        //color: '#3EC28F',
        '&$active': {
          color: '#3EC28F',
        },
        '&$completed': {
          color: '#3EC28F',
        },
      },
    },
  },
})

export default class UploadProjectForm extends React.Component {
  state = {
    stepIndex: 0,
    stepLabels: [],
    projectName: '',
    open: false,
  }

  static contextType = UploadProjectContext

  componentDidMount() {
    //console.log(this.context)
    this.setState({
      stepIndex: 0,
      projectName: window.history.state.projectName,
      stepLabels: [
        'Upload/Host Data',
        'Upload Raw Data',
        'Upload Metadata',
        'Map Data - Join',
        'Map Data - Select',
      ],
      open: false,
    })
    this.context.setStart(
      window.history.state.userId,
      window.history.state.orgId,
      window.history.state.projectName,
      window.history.state.token,
      window.history.state.tokenId
    )
  }

  handleNext() {
    //console.log(this.state.stepIndex)
    if (this.state.stepIndex === 0) {
      this.createProject()
    } else if (this.state.stepIndex === 1) {
      this.createFiles('RAW_DATA')
    } else if (this.state.stepIndex === 2) {
      this.createFiles('META_DATA')
    } else {
      this.setState(prevState => ({
        stepIndex: prevState.stepIndex + 1,
      }))
    }
  }

  handleBack() {
    this.setState(prevState => ({
      stepIndex: prevState.stepIndex - 1,
    }))
  }

  handleSkip() {
    this.setState(prevState => ({
      stepIndex: prevState.stepIndex + 1,
    }))
  }

  returnToDash() {
    this.context.clearProject()
    navigate('/app/collect')
  }

  async createProject() {
    await this.context.setProjectType('OPEN')
    //console.log("sending project")
    var axios = require('axios')
    var data = JSON.stringify({
      organisationId: this.context.orgId,
      createdByUserId: this.context.userId,
      name: this.context.projectName,
      dataTypes: this.context.dataTypes,
      license: this.context.license,
      projectType: this.context.projectType,
    })

    var config = {
      method: 'post',
      url: `${process.env.API}/projects`,
      headers: {
        token: this.context.token,
        tokenId: this.context.tokenId,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(
        function(response) {
          // console.log(JSON.stringify(response.data))
          this.context.setProjectId(response.data.response.createdProject.id)
          this.setState(prevState => ({
            stepIndex: prevState.stepIndex + 1,
          }))
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error)
      })
  }

  async createFiles(fileType) {
    let fileLinks = []
    let fileNames = []
    let fileIds = {}
    if (fileType === 'RAW_DATA') {
      fileLinks = this.context.rawFileLinks
      fileNames = this.context.rawFileNames
    } else if (fileType === 'META_DATA') {
      fileLinks = this.context.metaFileLinks
      fileNames = this.context.metaFileNames
    }
    fileLinks.map((link, index) => {
      ;(async () => {
        try {
          const response = await axios.post(
            `${process.env.API}/files`,
            {
              projectId: this.context.projectId,
              name: this.context.projectName,
              fileLink: link,
              license: this.context.license,
              fileType: fileType,
            },
            {
              headers: {
                token: this.context.token,
                tokenId: this.context.tokenId,
                'Content-Type': 'application/json',
              },
            }
          )
          //  console.log('response recieved is')
          // console.log(response)
          fileIds[fileNames[index]] = response.data.response.createdFile.id
        } catch (error) {
          console.log(error)
        }
      })()
    })
    if (fileType === 'META_DATA') {
      this.context.setMetaFileIds(fileIds)
    }
    this.setState(prevState => ({
      stepIndex: prevState.stepIndex + 1,
    }))
    // console.log(this.context)
    //console.log(this.state)
  }

  async createJoin() {
    var axios = require('axios')

    var data = JSON.stringify({
      projectId: this.context.projectId,
      fileId1: this.context.metaFileIds[this.context.metaFileNames[0]],
      fileId2: this.context.metaFileIds[this.context.metaFileNames[1]],
      joinColumnForFile1: this.context.metaJoinColumns[
        this.context.metaFileNames[0]
      ][0], //Need to modify after backend allows join on multiple columns
      joinColumnForFile2: this.context.metaJoinColumns[
        this.context.metaFileNames[1]
      ][0],
      columnsForFile1: [
        ...this.context.metaSelectColumns[this.context.metaFileNames[0]],
        this.context.metaJoinColumns[this.context.metaFileNames[0]][0],
      ],
      columnsForFile2: [
        ...this.context.metaSelectColumns[this.context.metaFileNames[1]],
        this.context.metaJoinColumns[this.context.metaFileNames[1]][0],
      ],
    })

    var config = {
      method: 'post',
      url: `${process.env.API}/joins`,
      headers: {
        token: this.context.token,
        tokenId: this.context.tokenId,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(
        function(response) {
          //console.log(JSON.stringify(response.data));
          // console.log(response)
          // if(response.data.status === 'SUCCESS'){  //Modify after testing the entire fuctionality.
          navigate('/app/collect/projectUploaded')
          //}
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error)
      })
    // console.log('We did it!')
  }

  async checkFilesStatus(retries, timeOut) {
    var axios = require('axios')
    var data = JSON.stringify({
      projectId: this.context.projectId,
    })

    var config = {
      method: 'post',
      url: `${process.env.API}/files/fetch`,
      headers: {
        token: this.context.token,
        tokenId: this.context.tokenId,
        'Content-Type': 'application/json',
      },
      data: data,
    }

    axios(config)
      .then(
        function(response) {
          // console.log(JSON.stringify(response.data))
          const files = response.data.response.files.filter(
            _ => _.fileType === 'META_DATA' && _.status !== 'PROCESSED'
          )
          // console.log(files)
          if (files.length > 0) {
            if (retries > 0) {
              return setTimeout(
                () => this.checkFilesStatus(--retries, timeOut),
                timeOut
              )
            } else {
              console.error('out of retries')
              this.createJoin()
            }
          } else {
            this.createJoin()
          }
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error)
      })
  }

  submitForm() {
    this.setState({ open: true })
    //Need to change number of retries and timeout based on number of files instead of hardcoding.
    this.checkFilesStatus(50, 5000)
  }

  checkFields() {
    return (
      this.context.metaFileType !== '' &&
      this.context.dataTypes.length !== 0 &&
      this.context.metaFileLinks.length !== 0 &&
      this.context.license !== '' &&
      Object.keys(this.context.metaJoinColumns).length !== 0 &&
      Object.keys(this.context.metaSelectColumns).length !== 0
    )
  }

  componentDidUpdate() {
    //console.log(this.state)
    // console.log(this.context)
  }

  render() {
    return (
      <ThemeProvider theme={stepperTheme}>
        <SEO title="Upload Existing Project" />
        <Breadcrumbs separator=">>" aria-label="breadcrumb">
          <Link color="inherit" to="/">
            Home
          </Link>
          <Link
            color="textPrimary"
            to="/app/collect/uploadProject"
            aria-current="page"
          >
            Collect
          </Link>
        </Breadcrumbs>
        <Container maxWidth="lg">
          <Typography variant="h5" align="center">
            Upload/Host Data
          </Typography>
        </Container>
        <Container maxWidth="md">
          <Stepper activeStep={this.state.stepIndex}>
            {this.state.stepLabels.map((label, index) => (
              <Step key={label}>
                <StepLabel style={{ color: '#3EC28F' }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Typography
            variant="body2"
            style={{ marginLeft: '1.5rem' }}
            gutterBottom
          >
            <Grid container direction="row" alignItems="center">
              Required Fields
              <ErrorOutlineIcon
                color="disabled"
                fontSize="small"
                style={{ marginLeft: '.5rem' }}
              />
            </Grid>
          </Typography>
          <Container maxWidth="md">
            {(() => {
              switch (this.state.stepIndex) {
                case 0:
                  return <HostData />
                case 1:
                  return <UploadRawData />
                case 2:
                  return <UploadMetaData />
                case 3:
                  return <MapDataJoin />
                case 4:
                  return <MapDataSelect />
              }
            })()}
          </Container>
          {this.state.open && (
            <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
              <br />
              <br />
              <Typography variant="h6" align="center">
                Processing..
              </Typography>
              <br />
              <br />
              <CircularProgress
                style={{ color: '#3EC28F', marginLeft: '50%' }}
              />
              <br />
              <br />
              <Typography variant="body2" align="center">
                Your files are being uploaded or processed. This might take upto{' '}
                {this.context.metaFileNames.length} minutes. Please wait. You
                will be directed to finish page after completion.
              </Typography>
              <br />
              <br />
              <Typography variant="body2" align="center">
                Incase of error, please write to support@citsci.earth.
              </Typography>
              <br />
              <br />
            </Dialog>
          )}
          <br />
          <Container maxWidth="md">
            <Grid container direction="row-reverse">
              <Grid item xs={4}>
                {this.state.stepIndex === 1 ? (
                  <Button
                    variant="contained"
                    onClick={() => this.handleSkip()}
                    color="primary"
                    style={{ backgroundColor: '#3EC28F' }}
                  >
                    Skip
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      this.state.stepIndex === 0
                        ? () => this.returnToDash()
                        : () => this.handleBack()
                    }
                    style={{ backgroundColor: '#3EC28F' }}
                  >
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={
                    this.state.stepIndex >= this.state.stepLabels.length - 1 &&
                    !this.checkFields()
                  }
                  onClick={
                    this.state.stepIndex < this.state.stepLabels.length - 1
                      ? () => this.handleNext()
                      : () => this.submitForm()
                  }
                  style={{ backgroundColor: '#3EC28F' }}
                >
                  {this.state.stepIndex >= this.state.stepLabels.length - 1
                    ? 'Submit'
                    : 'Next'}
                </Button>
              </Grid>
              <br />
              <br />
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    )
  }
}
