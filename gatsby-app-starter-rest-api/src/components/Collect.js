import React from 'react'
import { navigate } from '@reach/router'
import axios from 'axios'
import SEO from './common/Seo'
import Context from './common/Context'
import DashPanel from './common/DashPanel'
import CardSet from './common/CardSet'
import { makeStyles } from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  TextField,
  DialogContentText,
  DialogContent,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
  },
}))

export default class Collect extends React.Component {
  // const [projects, setProjects] = useState({
  //   projects: []
  // })

  state = {
    data: [],
    projectNames: [],
    open: false,
    newProjectName: '',
    task: '',
    dataStoryProjectId: '',
    dataStoryProjects: [],
    dataStoryType: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [
        { name: 'Sample Project', organisation: { name: 'Organization' } }, // placeholder project for when no projects yet
      ],
      projectNames: [],
      open: false,
      newProjectName: '',
      task: '',
      dataStoryProjectId: '',
      dataStoryProjects: [],
      dataStoryType: '',
    }
  }

  static contextType = Context

  async fetchProjects() {
    //e.preventDefault() Do we need this?
    // console.log("fetching")
    try {
      const { data } = await axios.get(`${process.env.API}/projects`, {
        headers: {
          token: this.context.data.token,
          tokenId: this.context.data.tokenId,
        },
      })

      // console.log(data)
      if (data.status === 'SUCCESS') {
        await this.setState({ data: data.response.projects })
        this.extractDocNames()
        this.extractDataStoryProjects()
      } else {
        console.log(data.reason)
      }
    } catch (err) {
      console.log(err)
      console.log(this.state.data)
    }
  }

  componentDidMount() {
    this.fetchProjects()
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  extractDocNames() {
    let names = []
    this.state.data.forEach(project => names.push(project.name))
    this.setState({
      projectNames: names,
    })
  }

  extractDataStoryProjects() {
    console.log('Reached Data story projects')
    const projects = []
    console.log(this.context.data.userId)
    let userId = this.context.data.userId
    this.state.data
      .filter(proj => proj.createdByUserId === userId)
      .forEach(proj => projects.push({ name: proj.name, id: proj.id }))
    console.log(projects)
    this.setState({
      dataStoryProjects: projects,
    })
  }

  dummy() {
    console.log('dummy')
  }

  handleClickOpen(label) {
    console.log('opening')
    console.log(label)
    this.setState({
      open: true,
      task: label,
    })
  }

  handleClose() {
    //console.log("closing")
    this.setState({
      open: false,
    })
  }

  handleTFChange = e => {
    this.setState({
      newProjectName: e.target.value,
    })
  }

  handleSPChange = e => {
    this.setState({
      dataStoryProjectId: e.target.value,
    })
  }

  handleSLChange = e => {
    this.setState({
      dataStoryType: e.target.value,
    })
  }

  submit() {
    this.handleClose()
    // console.log("userId: " + this.context.data.userId)
    // console.log("orgId: " + this.context.data.organizations[0].id)
    // console.log("name: " + this.state.projectName)
    navigate('/app/collect/createProject', {
      state: {
        userId: this.context.data.userId,
        orgId: this.context.data.organizations[0].id,
        projectName: this.state.newProjectName,
        token: this.context.data.token,
        tokenId: this.context.data.tokenId,
      },
    })
  }

  submitDataStory() {
    this.handleClose()
    navigate('/app/collect/createDataStory', {
      state: {
        dataStoryProjectId: this.state.dataStoryProjectId,
        dataStoryType: this.state.dataStoryType,
      },
    })
  }

  render() {
    return (
      <>
        <SEO title="Collect" />
        <Container maxWidth="lg" style={{ backgroundColor: '#e9ecef' }}>
          <br />
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ marginBottom: '1rem' }}
          >
            Collect Dashboard
          </Typography>
          <DashPanel
            buttons={[
              {
                label: 'Setup Organization Profile',
                task: () => this.dummy(),
                hide: true,
              },
              {
                label: 'Add New Project',
                task: () => this.handleClickOpen('Add New Project'),
                hide: false,
              },
              {
                label: 'Upload Existing Projects',
                task: () => this.dummy(),
                hide: true,
              },
              {
                label: 'Publish Datastory',
                task: () => this.handleClickOpen('Publish Datastory'),
                hide: false,
              },
              {
                label: 'Download Project Data',
                task: () => this.dummy(),
                hide: false,
              },
              {
                label: 'Add/Approve Users',
                task: () => this.dummy(),
                hide: true,
              },
              {
                label: 'Some Future Options',
                task: () => this.dummy(),
                hide: true,
              },
            ]}
            data={this.state.data}
          />
          {this.state.task === 'Add New Project' && (
            <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">
                <Typography variant="h5" align="left">
                  Project Name
                </Typography>
              </DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  id="contact"
                  type="text"
                  fullWidth
                  ref="nameInput"
                  onChange={this.handleTFChange}
                />
                <DialogContentText>
                  <Typography variant="body1" gutterBottom align="center">
                    Creat a unique name for you project to get you started. The
                    name of the project should be unique for you organization
                  </Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={() => this.handleClose()}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={
                    this.state.newProjectName === '' ||
                    (this.state.projectNames &&
                      this.state.projectNames.includes(
                        this.state.newProjectName
                      ))
                  }
                  style={{
                    backgroundColor: '#3EC28F',
                    margin: '1rem',
                    color: 'white',
                  }}
                  onClick={() => this.submit()}
                >
                  Create
                </Button>
              </DialogActions>
            </Dialog>
          )}
          {this.state.task === 'Publish Datastory' && (
            <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">
                <Typography variant="h5" align="left">
                  {this.state.task}
                </Typography>
              </DialogTitle>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <FormControl
                    variant="outlined"
                    style={{ marginLeft: '2rem', minWidth: '12rem' }}
                  >
                    <InputLabel htmlFor="project-select-outlined">
                      Select your project
                    </InputLabel>
                    <Select
                      variant="outlined"
                      onChange={this.handleSPChange}
                      value={this.state.dataStoryProjectId || ''}
                      inputProps={{
                        id: 'project-select-outlined',
                        name: 'dataStoryProjectID',
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {this.state.dataStoryProjects.map(project => (
                        <MenuItem value={project.id}>{project.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <br />
                  <br />
                  <FormControl
                    variant="outlined"
                    style={{ marginLeft: '2rem', minWidth: '12rem' }}
                  >
                    <InputLabel htmlFor="datastory-type-outlined">
                      Datastory Type
                    </InputLabel>
                    <Select
                      variant="outlined"
                      label="Datastory Type"
                      onChange={this.handleSLChange}
                      value={this.state.dataStoryType}
                      inputProps={{
                        id: 'datastory-type-outlined',
                        name: 'dataStoryType',
                      }}
                    >
                      <MenuItem value="location">Location</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" gutterBottom align="center">
                    You can publish a story/blog from your projects. Currently,
                    we support only location based stories. A notification is
                    sent to the contributors when a datastory is published.
                  </Typography>
                </Grid>
              </Grid>
              <DialogActions>
                <Button variant="contained" onClick={() => this.handleClose()}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  disabled={this.state.dataStoryProjectId === ''}
                  style={{
                    backgroundColor: '#3EC28F',
                    margin: '1rem',
                    color: 'white',
                  }}
                  onClick={() => this.submitDataStory()}
                >
                  Create
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Container>
      </>
    )
  }
}
