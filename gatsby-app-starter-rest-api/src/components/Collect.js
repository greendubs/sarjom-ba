import React, { useContext, useState, } from 'react'
import { navigate } from '@reach/router'
import axios from 'axios'
import SEO from './common/Seo'
import Context from './common/Context'
import DashPanel from './common/DashPanel'
import { makeStyles } from '@material-ui/core/styles'
import {Container,
        Typography,
        Button,
        DialogActions,
        Dialog,
        DialogTitle,
        TextField,
        DialogContentText,
        DialogContent,} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1
  }
}))

export default class Collect extends React.Component {
  // const { data } = useContext(Context);
  // const [projects, setProjects] = useState({
  //   projects: []
  // })
  state = {
    data: [],
    projectNames: [],
    open: false,
    newProjectName: "",
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "Sample Project", organisation: { name: "Organization"}, } // placeholder project for when no projects yet
      ],
      projectNames: [],
      open: false,
      newProjectName: "",
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
          tokenId: this.context.data.tokenId
        },
      })

      // console.log(data)
      if (data.status === 'SUCCESS') {
        await this.setState({data: data.response.projects})
        this.extractDocNames()
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
      projectNames: names
    })
  }

  dummy() {
    console.log("dummy")
  }

  handleClickOpen() {
    //console.log("opening")
    this.setState({
      open: true
    });
  }

  handleClose() {
    //console.log("closing")
    this.setState({
      open: false
    });;
  }

  handleTFChange = (e) => {
    this.setState({
      newProjectName: e.target.value
    })
  }

  submit(){
    
    this.handleClose()
    // console.log("userId: " + this.context.data.userId)
    // console.log("orgId: " + this.context.data.organizations[0].id)
    // console.log("name: " + this.state.projectName)
    navigate("/app/collect/createProject", 
              { state: {
                  userId: this.context.data.userId,
                  orgId: this.context.data.organizations[0].id, 
                  projectName: this.state.newProjectName,
                  token: this.context.data.token,
                  tokenId: this.context.data.tokenId
              }})
  }  

  render() {
  return (
    <>
      <SEO title="Collect" />
      <Container maxWidth="lg" style={{ backgroundColor: '#e9ecef' }}> 
        <br/>
        <Typography variant='h4' align='center' gutterBottom style={{marginBottom: '1rem'}}>
          Collect Dashboard
        </Typography>
        <DashPanel buttons={[{ label:'Setup Organization Profile', task: () => this.dummy(), hide: true },
                            { label:'Add New Project', task: () => this.handleClickOpen(), hide: false },
                            { label:'Upload Existing Projects', task: () => this.dummy(), hide: true },
                            { label:'Publish DataStory', task: () => this.dummy(), hide: false },
                            { label:'Download Project Data', task: () => this.dummy(), hide: false },
                            { label:'Add/Approve Users', task:() => this.dummy(), hide: true },
                            { label:'Some Future Options', task: () => this.dummy(), hide: true }]} data={this.state.data}/>

        <Dialog open={this.state.open} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            <Typography variant='h5' align='left'>
              Project Name
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TextField
              margin='dense'
              id='contact'
              type='text'
              fullWidth
              ref="nameInput"
              onChange={this.handleTFChange}
              />
            <DialogContentText>
              <Typography variant='body1' gutterBottom align='center'>
                Creat a unique name for you project to get you started. The name of the project
                should be unique for you organization
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              variant="contained"
              onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={this.state.newProjectName === "" || (this.state.projectNames &&
                        this.state.projectNames.includes(this.state.newProjectName))}
              style={{
                backgroundColor: '#3EC28F',
                margin: '1rem',
                color: 'white'}} 
              onClick={() => this.submit()}>
                Create
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  )
  }
}