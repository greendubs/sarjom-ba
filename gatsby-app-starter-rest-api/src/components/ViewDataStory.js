import React, { useContext, useState, useEffect } from 'react'
import SEO from 'components/common/Seo'
import Context from 'components/common/Context'
import axios from 'axios'
import {
  Typography,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import MapWithMarkers from 'components/common/GoogleMapMarkers'
import MUIRichTextEditor from 'mui-rte'

export default function ViewDataStory({ id, url }) {
  //console.log(location.pathname.split(':')[1].slice(0, -1))
  const { data } = useContext(Context)
  const [details, setDetails] = useState({
    name: '',
    content: '',
    projectId: '',
    dataStoryType: '',
    files: [],
    owner: '',
    projectName: '',
    contributors: [],
  })

  const fetchDataStory = async () => {
    try {
      console.log('reached fetch story')
      const response = await axios.get(`${process.env.API}/datastories/${id}`)
      console.log('received response is..')
      console.log(response)
      if (response.data.status === 'SUCCESS') {
        console.log('setting details..')
        const contributors = []
        const files = response.data.response.datastory.files
        files.forEach(file => {
          if (contributors.indexOf(file.uploadedByUser.name) === -1) {
            contributors.push(file.uploadedByUser.name)
          }
        })
        console.log(contributors)
        setDetails({
          ...details,
          files: response.data.response.datastory.files,
          name: response.data.response.datastory.name,
          content: response.data.response.datastory.content,
          owner: response.data.response.datastory.createdByUser.name,
          projectName: response.data.response.datastory.project.name,
          contributors: contributors,
        })
      } else {
        console.log(response.reason)
      }
    } catch (err) {
      console.log(err)
      console.log(details)
    }
  }

  useEffect(() => {
    console.log(details)
    fetchDataStory()
  }, [])

  return (
    <>
      <SEO title="Datastory" />
      <Container maxWidth="md" style={{ backgroundColor: '#e9ecef' }}>
        <Typography align="center" variant="h3">
          {details.name}
        </Typography>
        <Divider variant="middle" />
        <br />
        <br />
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            {' '}
            <MapWithMarkers files={details.files} />
          </Grid>
          <br />
          <Grid item>
            <MUIRichTextEditor
              defaultValue={details.content}
              readOnly={true}
              toolbar={false}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={3}>
          <Grid item xs={6}>
            <Typography style={{ float: 'right' }} variant="body1">
              <em>Project Name: </em>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align="left" variant="body1">
              <b>{details.projectName}</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ float: 'right' }} variant="body1">
              <em>Project Owner: </em>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align="left" variant="body1">
              <b>{details.owner}</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ float: 'right' }} variant="body1">
              <em>Contributors: </em>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <List style={{ padding: 0 }}>
              {details.contributors.map(contrib => (
                <ListItem style={{ padding: 0, margin: 0, alignItems: 'left' }}>
                  <ListItemText primary={contrib} />
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ float: 'right' }} variant="body1">
              <em>Share your story</em>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align="left" variant="body1">
              <a href={url}>{url}</a>
            </Typography>
          </Grid>
        </Grid>

        {/*} <Grid item xs={12}>
          <Grid item xs={6}>
            <Typography align="left" variant="body1">
              <em>Project Name: </em>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography align="left" variant="body1">
              <b>{details.projectName}</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="left" variant="body1">
              <em>Project Owner: </em>
              <b>{details.owner}</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="left" variant="body1">
              <em>Contributors: </em>{' '}
              <span>
                <List style={{ padding: 0 }}>
                  {details.contributors.map(contrib => (
                    <ListItem
                      style={{ padding: 0, margin: 0, alignItems: 'left' }}
                    >
                      <ListItemText primary={contrib} />
                    </ListItem>
                  ))}
                </List>
              </span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="left">
              {' '}
              Share your story: <a href={url}>{url}</a>
            </Typography>
          </Grid>
                  </Grid>*/}
      </Container>
    </>
  )
}
