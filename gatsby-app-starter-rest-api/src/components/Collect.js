import React, { useContext, useState } from 'react'
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
        CardActionArea} from '@material-ui/core'

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
  }

  static contextType = Context

  async fetchProjects() {
    //e.preventDefault() Do we need this?
    console.log("fetching")
    try {
      const { data } = await axios.get(`${process.env.API}/projects`, {
        headers: {
          token: this.context.data.token,
          tokenId: this.context.data.tokenId
        }
      })

      console.log(data)
      this.setState({data: data.response.projects})
    } catch (err) {
      console.log(err)
      console.log(this.state.data)
    }
  }

  componentDidMount() {
    this.fetchProjects()
  }
  
  componentDidUpdate() {
    //console.log(this.state)
  }

  dummy() {
    console.log("dummy")
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
          {/* Probably center these later */}
          <Grid item xs={3}>
            <MenuList >
              {[{ label:'Setup Organization Profile', task: () => this.dummy(), hide: true },
                { label:'Add New Projects', task: () => this.dummy(), hide: false },
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
                        style={{marginLeft: '0rem', textTransform: 'none', width: '213px'}}>
                        {properties.label}
                      </Button>
                  </MenuItem>
              ))}
            </MenuList>
          </Grid>
          <Grid item xs={9}>
            <GridList cols={4} cellHeight={300} style={{ backgroundColor: '#A9A9A9' }}>
              <GridListTile>
                <Card>
                  <CardContent align='center'>
                  <Avatar
                        style={{ backgroundColor: `#3EC28F`, marginTop: '.5rem', marginBottom: '.5rem'  }}
                      >
                        {' '}
                        {'S'}
                      </Avatar>
                    <Typography align='center' variant="subtitle1"> 
                      Sample Project
                    </Typography>
                    <Typography align='center' variant="subtitle2" gutterBottom> 
                      Organization
                    </Typography>
                  </CardContent>
                  <CardActionArea style={{display: 'flex', alignItems: 'center'}}>
                    <Button variant='outlined'>
                      DataStory
                    </Button>
                  </CardActionArea>
                  <CardActionArea style={{display: 'flex', alignItems: 'center'}}>
                    <Button variant='outlined'>
                      Contributors
                    </Button>
                  </CardActionArea>
                </Card>
              </GridListTile>
            </GridList>
          </Grid>
        </Grid>
      </Container>
    </>
  )
  }
}