import React from 'react'
import SEO from './common/Seo'
import { navigate } from '@reach/router'
import { ProjectContext } from './ProjectContext'
import {Button,
        Grid,
        Stepper, 
        Step,
        StepLabel,
        StepContent,
        Typography,
        Container, } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
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
    stepIndex: "",
    stepLabels: [],
    projectName: "",
  }

  static contextType = ProjectContext

  componentDidMount() {
    //console.log(window.history.state)
    this.setState({
      stepIndex: 0,
      projectName: window.history.state.projectName,
      stepLabels:  ['Add Project', 'Setup Data', 'Invite Users', ]
    })
    this.context.setStart(window.history.state.userId, 
                          window.history.state.orgId,
                          window.history.state.projectName)
  }

  handleNext() {
    // switch statement, if at end, submit, go to thank you page
    this.setState(prevState => ({
      stepIndex: prevState.stepIndex + 1
    }))
  }

  handleBack() {
    // switch statement, is at beginning, clear state, go back to collect
    this.setState(prevState => ({
      stepIndex: prevState.stepIndex - 1
    }))
  }

  returnToDash() {
    this.context.clearProject()
    navigate("/app/collect")
  }

  submitForm() {
    //TODO: make sure to check all required fields are set
    this.context.setProjectType("OPEN")
    console.log(this.context);
    // TODO: make API request to post context details as new project
    this.context.clearProject()
    navigate("/app/collect/projectCreated", 
              { state: { createdProject: this.state.projectName }})
  }

  componentDidUpdate() {
    // console.log(this.state)
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
        <br></br>
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