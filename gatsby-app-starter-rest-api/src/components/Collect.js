import React, { useContext, useState } from 'react'
import axios from 'axios'
import SEO from './common/Seo'
import Context from './common/Context'
import {Container,
        Typography,
        Drawer,
        GridList,
        GridListTile,
        List,
        ListItem,
        Divider } from '@material-ui/core'

export default class Collect extends React.Component {
  // const { data } = useContext(Context);
  // const [projects, setProjects] = useState({
  //   projects: []
  // })
  state = {
    data: []

  }

  static contextType = Context

  async fetchProjects() {
    //e.preventDefault() Do we need this?
    console.log("fetching")
    try {
      const { data } = await axios.get(`${process.env.API}/projects`, {
        headers: {
          token: this.state.data.token,
          tokenId: this.state.data.tokenId
        }
      })

      console.log(data)
    } catch (err) {
      console.log(err)
      console.log(this.state.data.token)
      console.log(this.state.data.tokenId)
    }
  }

  componentDidMount() {
    console.log(this.context.data)
    this.setState({data: this.context.data})
    this.fetchProjects()
  }
  
  render() {
  return (
    <>
      <SEO title="Collect" />
      <Container maxWidth="lg" style={{ backgroundColor: '#e9ecef'}}> 
        <Typography variant='h5' align='center'>
          Collect Dashboard
        </Typography>
        

      </Container>
    </>
  )
  }
}