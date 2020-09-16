import React, { useContext, useState, } from 'react'
import SEO from './common/Seo'
import Context from './common/Context'
import DashPanel from './common/DashPanel'
import CardSet from './common/CardSet'
import StoriesSet from './common/StoriesSet'
import {Container,
        Typography,
        Link} from '@material-ui/core'

export default class SendDashboard extends React.Component {
  state = {
    data: [],
    stories: [],
    communities: [],
    content:''
  }

  constructor(props) {
    super(props)
    this.state = {
      data: [
        { name: "Sample Name", organisation: { name: "Organization Name"}, } // placeholder project for when no projects yet
      ],
      stories: [
        {name: "Project Name", 
         organization: "Organization Name", 
         date: "Publish date",
         desc: "Last quarter, on Vashon Island, we had .............................................. *Show first 100 characters",
         images: "*Preview any images/document",
         view: "*Option to click and open up a page to view the complete story. Some stories to be pwd protected"},
        {name: "Project Name", 
         organization: "Organization Name", 
         date: "Publish date",
         desc: "Last quarter, on Vashon Island, we had .............................................. *Show first 100 characters",
         images: "*Preview any images/document",
         view: "*Option to click and open up a page to view the complete story. Some stories to be pwd protected"},
      ],
      communities: [
        { name: "Sample Name", organisation: { name: "Organization Name"}, },
        { name: "Sample Name", organisation: { name: "Organization Name"}, }
      ],
      content: 'projects'
    }
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  dummy() {
    console.log("dummy")
  }

  changeContent(target) {
    this.setState({
      content: target
    })
  }

  render() {
    return (
      <>
        <SEO title="Send Dashboard" />
        <Container maxWidth="lg" style={{ backgroundColor: '#e9ecef' }}> 
          <br/>
          <Typography variant='h4' align='center' gutterBottom style={{marginBottom: '1rem'}}>
            My Dashboard
          </Typography>
          <DashPanel buttons={[{ label:'Setup My Profile', task: () => this.dummy(), hide: true },
                              { label:'View My Projects', task: () => this.changeContent('projects'), hide: false },
                              { label:'Explore Stories', task: () => this.changeContent('stories'), hide: false },
                              { label:'Explore Community', task: () => this.changeContent('community'), hide: false },
                              { label:'My Privacy', task: () => this.dummy(), hide: true },
                              { label:'Security & Settings', task:() => this.dummy(), hide: true },
                              { label:'Some Future Options', task: () => this.dummy(), hide: true }]}>
            {(() => {
              switch (this.state.content) {
                case 'projects': return <CardSet cards={this.state.data} button1="My Contributions" button2="View Datastories"/>
                case 'stories': return <StoriesSet stories={this.state.stories}/>
                case 'community': return <CardSet cards={this.state.communities} button1='About Us' button2="View Our Stories"/>
              }
            })()}  
          </DashPanel>
        </Container>
        <Container maxWidth='sm'>
          <Typography variant="body2" align='center' style={{marginTop: '15px'}} gutterBottom>
              We are a not-for-profit that develops free and open source software for environment and climate change.  
              <Link> Purchase a membership and support our community.</Link>
          </Typography>
        </Container>
      </>
    )
    }
}
