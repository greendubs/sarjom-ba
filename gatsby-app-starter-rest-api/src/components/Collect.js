import React, { useContext, useState, } from 'react'
import { navigate } from '@reach/router'
import axios from 'axios'
import SEO from './common/Seo'
import Context from './common/Context'
import { makeStyles } from '@material-ui/core/styles'
import {Container,
        Typography,
        MenuList,
        MenuItem,
        Grid,
        GridList,
        GridListTile,
        Card,
        CardContent,
        CardActions,
        Button,
        Avatar, 
        CardActionArea,
        Link,
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
        <Typography variant='h5' align='center' gutterBottom>
          Collect Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <MenuList >
              {[{ label:'Setup Organization Profile', task: () => this.dummy(), hide: true },
                { label:'Add New Project', task: () => this.handleClickOpen(), hide: false },
                { label:'Upload Existing Projects', task: () => this.dummy(), hide: true },
                { label:'Publish DataStory', task: () => this.dummy(), hide: false },
                { label:'Download Project Data', task: () => this.dummy(), hide: false },
                { label:'Add/Approve Users', task:() => this.dummy(), hide: true },
                { label:'Some Future Options', task: () => this.dummy(), hide: true }].map((properties) => (
                  <MenuItem>
                      <Button 
                        variant="contained" 
                        onClick={properties.task}  
                        disabled={properties.hide}
                        style={{marginLeft: '1.25rem', textTransform: 'none', width: '213px'}}>
                        {properties.label}
                      </Button>
                  </MenuItem>
              ))}
            </MenuList>
          </Grid>
          <Grid item xs={9}>
            {/* TODO: increase padding both in the grid item and gridlist to make it a little cleaner */}
            <GridList cols={4} spacing={6} cellHeight={300} style={{ backgroundColor: '#A9A9A9' }}>
              {(this.state.data).map((project) => (  
                <GridListTile>
                  <Card>
                    <CardContent align='center'>
                    <Avatar
                          style={{ backgroundColor: `#3EC28F`, marginTop: '.5rem', marginBottom: '.5rem'  }}
                        >
                          {' '}
                          {project.name.charAt(0).toUpperCase()}
                        </Avatar>
                      <Typography align='center' variant="subtitle1"> 
                        {project.name}
                      </Typography>
                      <Typography align='center' variant="body2" gutterBottom> 
                        {project.organisation.name}
                      </Typography>
                    </CardContent>
                    <Grid container 
                      spacing={1} 
                      direction='column' 
                      alignItems='center' 
                      justify='center' 
                      style={{marginBottom: '10px'}}>   
                      <Grid item>
                        <Button variant='outlined' style={{marginLeft:'0px'}}>
                          DataStory
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant='outlined' style={{marginLeft:'0px'}}>
                          Contributors
                        </Button>
                      </Grid>
                    </Grid> 
                    
                  </Card>
                </GridListTile>
              ))} 
            </GridList>
            <Typography variant="body2" align='center' style={{marginTop: '15px'}}>
                Free tier includes a mazimum of 3 projects with 5GBs of data capacity.
                Please contact support@citsci.earth for additional data capacity.
            </Typography>
          </Grid>
        </Grid>
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