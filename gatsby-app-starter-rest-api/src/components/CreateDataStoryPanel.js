import React, { useContext, useState, useEffect } from 'react'
import SEO from './common/Seo'
import { navigate } from '@reach/router'
import { Link } from 'gatsby'
import axios from 'axios'
import Context from 'components/common/Context'
import {
  Button,
  Grid,
  Typography,
  Container,
  Breadcrumbs,
  TextField,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import MapWithMarkers from 'components/common/GoogleMapMarkers'
import MUIRichTextEditor from 'mui-rte'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import DataStoriesSet from 'components/common/DataStoriesSet'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const defaultTheme = createMuiTheme()

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        width: '85%',
        borderTop: '1px solid gray',
        borderRight: '1px solid gray',
        borderLeft: '1px solid gray',
      },

      editor: {
        border: '1px solid gray',
      },
    },
  },
})

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 'auto',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    //minWidth: 1000, // a number of your choice
    width: `-webkit-fill-available`, // a number of your choice
  },
  editor: {
    border: '1px solid gray',
  },
}))

export default function CreateDataStoryPanel() {
  const { data } = useContext(Context)

  const [details, setDetails] = useState({
    dataStoryName: '',
    dataStoryContent: '',
    projectId: '',
    dataStoryType: '',
    files: [],
    dataStories: [],
  })

  const [published, setPublished] = useState([])
  const [drafts, setDrafts] = useState([])

  const [errors, setErrors] = useState({
    dataStoryName: '',
    dataStoryContent: '',
  })

  const [isInitialLoad, setInitialLoad] = useState(true)
  const [isChanged, setChanged] = useState(false)
  const [isDraft, setIsDraft] = useState(false)
  const [draftID, setDraftID] = useState('')

  const [open, setOpen] = useState(false)

  //const [isSubmitting, setSubmitting] = useState(true)

  const classes = useStyles()
  const [value, setValue] = useState(0)

  const headers = { token: data.token, tokenId: data.tokenId }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const fetchFiles = async () => {
    try {
      console.log('reached fetch files')
      const response = await axios.post(
        `${process.env.API}/files/fetch`,
        {
          projectId: window.history.state.dataStoryProjectId,
        },
        {
          headers: {
            token: data.token,
            tokenId: data.tokenId,
          },
        }
      )
      console.log('received response is..')
      console.log(response.data.response.files)
      if (response.data.status === 'SUCCESS') {
        console.log('setting details..')
        setDetails({
          ...details,
          files: response.data.response.files,
          projectId: window.history.state.dataStoryProjectId,
          dataStoryType: window.history.state.dataStoryType,
        })
        console.log(details)
        setInitialLoad(false)
      } else {
        console.log(response.reason)
      }
    } catch (err) {
      console.log(err)
      console.log(details.files)
    }
  }

  const fetchDataStories = async () => {
    try {
      console.log('reached fetch data stories')
      const response = await axios.get(
        `${process.env.API}/datastories/fetch-list-for-project/${window.history.state.dataStoryProjectId}`,
        {
          headers: {
            token: data.token,
            tokenId: data.tokenId,
          },
        }
      )
      console.log('received response is..')
      console.log(response.data.response.datastories)
      if (response.data.status === 'SUCCESS') {
        console.log('setting details..')
        const dataStories = response.data.response.datastories
        console.log(dataStories)
        const published = dataStories.filter(story => story.isDraft === false)
        const drafts = dataStories.filter(story => story.isDraft === true)
        console.log('drafts')
        console.log(drafts)
        console.log('published')
        console.log(published)
        setPublished(published)
        setDrafts(drafts)
      } else {
        console.log(response.reason)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isInitialLoad) {
      console.log('Reached file effect')
      fetchFiles()
      setInitialLoad(false)
    }
  }, [])

  useEffect(() => {
    if (!isChanged) {
      console.log('Reached story effect')
      //fetchFiles()
      fetchDataStories()
      setChanged(true)
      //}
    }
  }, [isChanged])

  const dummy = () => {
    console.log('dummy')
  }

  const handleViewDS = id => () => {
    console.log(id)
    navigate(`/viewDataStory/:${id}/`)
  }

  const handleEditDS = id => async () => {
    console.log(id)
    //a11yProps(0)
    try {
      console.log('reached fetch story')
      const response = await axios.get(`${process.env.API}/datastories/${id}`)
      console.log('received response is..')
      console.log(response)
      if (response.data.status === 'SUCCESS') {
        console.log('setting edit details')
        setDetails({
          ...details,
          files: response.data.response.datastory.files,
          dataStoryName: response.data.response.datastory.name,
          dataStoryContent: response.data.response.datastory.content,
        })
        setIsDraft(true)
        setDraftID(id)
        setValue(0)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleTFChange = e => {
    console.log(e.target.value)
    if (!e.target.value) {
      setErrors({ ...errors, dataStoryName: 'Required Field' })
    }
    setDetails({ ...details, dataStoryName: e.target.value })
    console.log(details)
  }

  const handleSave = data => {
    //Need to implement validation
    setDetails({
      ...details,
      dataStoryContent: data,
    })
    console.log(details)
  }

  const handlePublish = async e => {
    e.preventDefault()
    //setSubmitting(true)

    try {
      const {
        dataStoryName,
        dataStoryContent,
        projectId,
        dataStoryType,
      } = details
      console.log(dataStoryName, dataStoryContent, projectId, dataStoryType)
      if (!dataStoryName) {
        console.log('Reached errors')
        setErrors({ ...errors, dataStoryName: 'Field is required' })
      } else {
        console.log(isDraft)
        if (!isDraft) {
          const response = await axios.post(
            `${process.env.API}/datastories`,
            {
              projectId: projectId,
              name: dataStoryName,
              type: dataStoryType,
              content: dataStoryContent,
              isDraft: false,
            },
            {
              headers: headers,
            }
          )
          console.log('response received is')
          console.log(response)
          if (response.data.status === 'SUCCESS') {
            setChanged(false)
            navigate(
              `/viewDataStory/:${response.data.response.createdDatastory.id}/`
            )
          }
        } else {
          console.log(draftID)
          const response = await axios.put(
            `${process.env.API}/datastories/update-draft/${draftID}`,
            {
              name: dataStoryName,
              content: dataStoryContent,
              isDraft: false,
            },
            {
              headers: headers,
            }
          )
          console.log('response received is')
          console.log(response)

          if (response.data.status === 'SUCCESS') {
            setChanged(false)
            navigate(
              `/viewDataStory/:${response.data.response.updatedDatastory.id}/`
            )
          }
        }
      }
    } catch (error) {
      // setSubmitting(false)
      console.log(error)
    }
  }

  const handleSaveDraft = async e => {
    e.preventDefault()
    // setSubmitting(true)

    try {
      const {
        dataStoryName,
        dataStoryContent,
        projectId,
        dataStoryType,
      } = details
      console.log(dataStoryName, dataStoryContent, projectId, dataStoryType)
      if (!dataStoryName) {
        console.log('Reached errors')
        setErrors({ ...errors, dataStoryName: 'Field is required' })
      } else {
        const response = await axios.post(
          `${process.env.API}/datastories`,
          {
            projectId: projectId,
            name: dataStoryName,
            type: dataStoryType,
            content: dataStoryContent,
            isDraft: true,
          },
          {
            headers: headers,
          }
        )
        console.log('response recieved is')
        console.log(response)
        setChanged(false)
        setOpen(true)
      }
    } catch (error) {
      // setSubmitting(false)
      console.log(error)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <SEO title="Datastory" />
      <Breadcrumbs separator=">>" aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>
        <Link
          color="textPrimary"
          to="/app/collect/createDataStory"
          aria-current="page"
        >
          Geo-DataStory
        </Link>
      </Breadcrumbs>

      <Container maxWidth="lg" style={{ backgroundColor: '#e9ecef' }}>
        <br />
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ marginBottom: '1rem' }}
        >
          Geographic Datastory
        </Typography>
        <div className={classes.root}>
          <Tabs
            orientation="vertical"
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            className={classes.tabs}
          >
            <Tab label="Create Datastory" {...a11yProps(0)} />
            <Tab label="Saved Drafts" {...a11yProps(1)} />
            <Tab label="Published Datastories" {...a11yProps(2)} />
            <Tab label="View Feedback" {...a11yProps(3)} />
            <Tab label="Publish Feedback" disabled {...a11yProps(4)} />
            <Tab label="Publish Settings" disabled {...a11yProps(5)} />
            <Tab label="Some Future Options" disabled {...a11yProps(6)} />
          </Tabs>
          <TabPanel className={classes.tabPanel} value={value} index={0}>
            <Grid container spacing={3}>
              <Grid item xs={9}>
                <TextField
                  id="title-outlined"
                  label="Title - 100 words max."
                  variant="outlined"
                  style={{ width: '35rem' }}
                  onChange={handleTFChange}
                  defaultValue={details.dataStoryName}
                />
                <br />
                {errors.dataStoryName && (
                  <span style={{ color: 'red' }}>{errors.dataStoryName}</span>
                )}
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">
                  Add a title that headlines your story.
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <MapWithMarkers files={details.files} />
              </Grid>
              <Grid item xs={3}>
                {console.log(details.files)}
                <Typography variant="body2">
                  Click on the map to see markers. Click on markers to see
                  additional information. Zoom into the area and the view that
                  you want people to see.
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <MuiThemeProvider theme={defaultTheme}>
                  <MUIRichTextEditor
                    defaultValue={details.dataStoryContent}
                    label="Add your story here.."
                    inlineToolbar={true}
                    onSave={handleSave}
                  />
                </MuiThemeProvider>
                {errors.dataStoryContent && (
                  <span style={{ color: 'red' }}>
                    {errors.dataStoryContent}
                  </span>
                )}
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">
                  Add content to your story with images and videos. Click Save.
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={details.dataStoryName === ''}
                  onClick={handleSaveDraft}
                  style={{
                    backgroundColor: '#3EC28F',
                    color: 'white',
                    float: 'left',
                    marginTop: '3rem',
                  }}
                >
                  Save Draft
                </Button>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    Draft is saved!
                  </Alert>
                </Snackbar>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={details.dataStoryName === ''}
                  onClick={handlePublish}
                  style={{
                    backgroundColor: '#3EC28F',
                    color: 'white',
                    float: 'right',
                    marginTop: '3rem',
                    marginRight: '10rem',
                  }}
                >
                  Publish
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2" style={{ marginTop: '3rem' }}>
                  Save a draft or publish your data story. Once you publish, an
                  email notification will be sent to data contributors about the
                  story.
                </Typography>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={value} index={1}>
            <DataStoriesSet
              cards={drafts}
              file={details.files[0]}
              button={{ label: 'Edit', function: handleEditDS }}
            />
          </TabPanel>
          <TabPanel className={classes.tabPanel} value={value} index={2}>
            <DataStoriesSet
              cards={published}
              file={details.files[0]}
              button={{ label: 'View', function: handleViewDS }}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            Under Development
          </TabPanel>
          <TabPanel value={value} index={4}>
            Under Development
          </TabPanel>
          <TabPanel value={value} index={5}>
            Under Development
          </TabPanel>
          <TabPanel value={value} index={6}>
            Under Development
          </TabPanel>
        </div>
      </Container>
      <Typography align="center" gutterBottom>
        <Button
          variant="contained"
          style={{
            backgroundColor: '#3EC28F',
            color: 'white',
            marginLeft: '0px',
          }}
          onClick={() => navigate('/app/collect')}
        >
          Back to Dashboard
        </Button>
      </Typography>
    </>
  )
}
