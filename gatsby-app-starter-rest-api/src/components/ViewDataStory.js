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

export default function ViewDataStory({ id }) {
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
      //console.log('reached fetch story')
      const response = await axios.get(`${process.env.API}/datastories/${id}`)
      // console.log('received response is..')
      // console.log(response)
      if (response.data.status === 'SUCCESS') {
        // console.log('setting details..')
        const contributors = []
        const files = response.data.response.datastory.files
        files.forEach(file => {
          if (contributors.indexOf(file.uploadedByUser.name) === -1) {
            contributors.push(file.uploadedByUser.name)
          }
        })
        // console.log(contributors)
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
    // console.log(details)
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
          <Grid item>
            <MUIRichTextEditor
              defaultValue={details.content}
              readOnly={true}
              toolbar={false}
            />
          </Grid>
          <Grid item>
            <Typography align="center" variant="body1">
              <em>Project Name: </em>
              <b>{details.projectName}</b>
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" variant="body1">
              <em>Project Owner: </em>
              <b>{details.owner}</b>
            </Typography>
            <Grid item>
              <Typography alogn="center" variant="body1">
                <em>Contributors: </em>
              </Typography>
              <List style={{ padding: 0 }}>
                {details.contributors.map(contrib => (
                  <ListItem>
                    <ListItemText primary={contrib} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
