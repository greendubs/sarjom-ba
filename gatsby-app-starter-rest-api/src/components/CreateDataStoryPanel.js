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
  })

  const [errors, setErrors] = useState({
    dataStoryName: '',
    dataStoryContent: '',
  })

  const [isInitialLoad, setInitialLoad] = useState(true)
  const [isSubmitting, setSubmitting] = useState(false)

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
      } else {
        console.log(response.reason)
      }
    } catch (err) {
      console.log(err)
      console.log(details.files)
    }
  }

  useEffect(() => {
    if (isInitialLoad) {
      console.log(window.history.state.dataStoryProjectId)
      console.log(details)
      fetchFiles()
      setInitialLoad(false)
    }
  }, [])

  const dummy = () => {
    console.log('dummy')
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

  // handleBack() {
  // this.setState(prevState => ({
  // stepIndex: prevState.stepIndex - 1,
  //}))
  //}

  //returnToDash() {
  // this.context.clearProject()
  //navigate('/app/collect')
  //}

  const handlePublish = async e => {
    e.preventDefault()
    setSubmitting(true)

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
            isDraft: false,
          },
          {
            headers: headers,
          }
        )
        console.log('response received is')
        console.log(response)

        if (response.data.status === 'SUCCESS') {
          console.log('viewDataStory/${response.data.response.id}')
          navigate(
            `/viewDataStory/:${response.data.response.createdDatastory.id}/`,
            {
              state: {
                dataStoryId: response.data.response.createdDatastory.id,
              },
            }
          )
        }
      }
    } catch (error) {
      setSubmitting(false)
      console.log(error)
    }
  }

  const handleSaveDraft = async e => {
    e.preventDefault()
    setSubmitting(true)

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
      }
    } catch (error) {
      setSubmitting(false)
      console.log(error)
    }
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
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs"
            className={classes.tabs}
          >
            <Tab label="Create Datastory" {...a11yProps(0)} />
            <Tab label="Saved Drafts" {...a11yProps(1)} />
            <Tab label="Published Datastories" {...a11yProps(2)} />
            <Tab label="View Feedback" {...a11yProps(3)} />
            <Tab label="Publish Feedback" {...a11yProps(4)} />
            <Tab label="Publish Settings" {...a11yProps(5)} />
            <Tab label="Some Future Options" {...a11yProps(6)} />
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
                <Typography variant="body2">
                  Click on the map to see markers. Zoom into the area and the
                  view that you want people to see.
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
                  Add content to your story with images and videos.
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
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
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
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
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
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
    </>
  )
}
