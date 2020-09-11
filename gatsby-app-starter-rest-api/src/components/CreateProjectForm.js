import React from 'react'
import SEO from './common/Seo'
import { navigate } from '@reach/router'
import axios from 'axios'
import { ProjectContext } from './ProjectContext'
import {Button,
        Grid,
        Stepper, 
        Step,
        StepLabel,
        Typography,
        Container, 
        Snackbar,
        Alert} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { inviteLocation } from './Keys'
import AddProject from './AddProjectStep'
import SetupData from './SetupDataStep'
import InviteUsers from './InviteUsersSteps'

const stepperTheme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
        root: {
            //color: '#3EC28F',
            '&$active': {
                color: '#3EC28F'
            },
            '&$completed': {
              color: '#3EC28F'
          },
        },
    },
  },
})

export default class CreateProjectForm extends React.Component {
  state = {
    stepIndex: 0,
    stepLabels: [],
    projectName: "",
    ready: false,
  }

  static contextType = ProjectContext

  componentDidMount() {
    this.setState({
      stepIndex: 0,
      projectName: window.history.state.projectName,
      stepLabels:  ['Add Project', 'Setup Data', 'Invite Users', ],
      ready: false
    })
    this.context.setStart(window.history.state.userId, 
                          window.history.state.orgId,
                          window.history.state.projectName,
                          window.history.state.token,
                          window.history.state.tokenId)
  }

  handleNext() {
    this.setState(prevState => ({
      stepIndex: prevState.stepIndex + 1
    }))
  }

  handleBack() {
    this.setState(prevState => ({
      stepIndex: prevState.stepIndex - 1
    }))
  }

  returnToDash() {
    this.context.clearProject()
    navigate("/app/collect")
  }

  async submitForm() {
    await this.context.setProjectType("OPEN")
    console.log("sending project")
    var axios = require('axios');
    var data = JSON.stringify({"organisationId":this.context.orgId,
                              "createdByUserId":this.context.userId,
                              "name":this.context.projectName,
                              "description":this.context.description,
                              "documentLinks":this.context.documentLinks,
                              "bannerLink":this.context.bannerLink,
                              "dataTypes":this.context.dataTypes,
                              "metaData":this.context.metaData,
                              "license":this.context.license,
                              "projectType":this.context.projectType});

    var config = {
      method: 'post',
      url: `${process.env.API}/projects`,
      headers: { 
        'token': this.context.token, 
        'tokenId': this.context.tokenId, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      //console.log("sending invites")
      this.sendInvites(response.data.response.createdProject.id)
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });

  }

  async sendInvites(newId) {
    var axios = require('axios');
    var data = JSON.stringify({"organisationId":this.context.orgId,
                                "projectId":newId,
                                "bucketName":inviteLocation,
                                "userInvitationFileS3Key":this.context.inviteKey});

    var config = {
      method: 'post',
      url: `${process.env.API}/users/invite`,
      headers: { 
        'token': this.context.token,
        'tokenId': this.context.tokenId, 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      this.context.clearProject()
      console.log("We did it!")
      navigate("/app/collect/projectCreated", 
                { state: { 
                  createdProject: this.state.projectName 
                }})
      }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  }

  checkFields() {
    return (this.context.description !== "" &&
            this.context.dataTypes.length !== 0 &&
            this.context.metaData.length !== 0 &&
            this.context.license !== "" &&
            this.context.inviteKey !== "")
  }

  componentDidUpdate() {
    console.log(this.state)
    // console.log(this.context)
  }

  render() {
    return (
      <ThemeProvider theme={stepperTheme}>
      <SEO title="Create Project"/>
      <Container maxWidth='lg'>
          <Typography variant='h5' align='center'>
            {this.state.projectName}
          </Typography>
      </Container>
      <Container maxWidth='md' >
        <Stepper activeStep={this.state.stepIndex}>
          {this.state.stepLabels.map((label, index) => (
            <Step key={label}>
              <StepLabel style={{color: '#3EC28F'}}>{label}</StepLabel>
              
            </Step>
          ))}
        </Stepper>
        <Typography variant='body2' style={{marginLeft: '1.5rem'}} gutterBottom>
            <Grid container direction='row' alignItems='center'>
            Required Fields 
            <ErrorOutlineIcon color='disabled' fontSize='small' style={{ marginLeft: '.5rem'}}/>
            </Grid>
        </Typography>
        <Container maxWidth='md'>
          {(() => {
            switch (this.state.stepIndex) {
              case 0: return <AddProject/>
              case 1: return <SetupData/>
              case 2: return <InviteUsers/>
            }
          })()}
        </Container>
        <br/>
        <Container maxWidth='md'>
          <Grid container direction='row-reverse'>
            <Grid item xs={4}>
              <Button
                variant='contained'
                onClick={this.state.stepIndex === 0 ? 
                        () => this.returnToDash() : 
                        () => this.handleBack()}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.stepIndex >= this.state.stepLabels.length - 1 &&
                          !(this.checkFields())}
                onClick={this.state.stepIndex < this.state.stepLabels.length - 1 ?
                          () => this.handleNext() :
                          () => this.submitForm()}
                style={{backgroundColor: '#3EC28F'}}
              >
                {this.state.stepIndex >= this.state.stepLabels.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Container>
      </ThemeProvider>  
    )
  }
}