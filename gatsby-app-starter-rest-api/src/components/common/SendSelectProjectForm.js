import React, { useContext, useState, useEffect } from 'react'
import {
  Button,
  Typography,
  Avatar,
  Container,
  Divider,
  Grid,
} from '@material-ui/core'
import axios from 'axios'
import { Link, navigate } from 'gatsby'
import SEO from 'components/common/Seo'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Context from 'components/common/Context'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 300,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}))

export default function SendSelectProjectForm() {
  const { data } = useContext(Context)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isInitialLoad, setInitialLoad] = useState(false)
  const [details, setDetails] = useState({
    organization: '',
    project: '',
  })
  const [projects, setProjects] = useState({ projects: [] })
  const [errors, setErrors] = useState({
    organization: '',
    project: '',
  })

  const [projectOptions, setProjectOptions] = useState([])

  const classes = useStyles()

  const headers = { token: data.token, tokenId: data.tokenId }

  //console.log(headers)

  const getProjects = async () => {
    try {
      const response = await axios.get(`${process.env.API}/projects`, {
        headers: headers,
      })
      console.log('response recieved is')
      console.log(response.data.response.projects)

      setProjects({ ...projects, projects: response.data.response.projects })
      console.log(projects)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = e => {
    setDetails({ ...details, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value)
    if (e.target.name === 'organization') {
      const options = []
      console.log(projects)
      for (let i = 0, l = projects.projects.length; i < l; i += 1) {
        // console.log(projects.projects[i])
        if (projects.projects[i].organisationId === e.target.value) {
          options.push({
            id: projects.projects[i].id,
            name: projects.projects[i].name,
          })
        }
      }
      console.log(options)
      setProjectOptions(options)
      //console.log(projectOptions)
    }
  }

  const handleBlur = e => {
    if (!e.target.value) {
      setErrors({ ...errors, [e.target.name]: 'Required field' })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

    //console.log(e)
    try {
      const { organization, project } = details
      console.log(organization, project)

      if (!organization || !project) {
        console.log('Reached errors')
        console.log(organization, project)
        setErrors({
          ...errors,
          organization: 'Field is required',
          project: 'Field is required',
        })
      } else {
        // store project and organization details in context
        data.setSendData(organization, project)
        console.log('isSubmitting')
        console.log(data)
        navigate('../dataset')
      }
    } catch (error) {
      setSubmitting(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (!isInitialLoad) {
      getProjects()
      setInitialLoad(true)
    }
  }, [])

  return (
    <div className="container">
      <SEO title="Send Data" />

      <Breadcrumbs separator=">>" aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Home
        </Link>
        <Link color="textPrimary" to="/app/send" aria-current="page">
          Send Data
        </Link>
      </Breadcrumbs>
      <Container maxWidth="sm" align="center">
        <Typography align="center" variant="h6">
          Select your organization and project
        </Typography>
        <Divider variant="middle" />
        <form onSubmit={handleSubmit}>
          <div className={classes.root}>
            <Paper className={classes.paper}>
              <Grid container wrap="nowrap" spacing={0}>
                <Grid item>
                  <Avatar
                    style={{
                      backgroundColor: `mediumseagreen`,
                      /*marginTop: '1.5rem',*/
                    }}
                  >
                    {data.userName.charAt(0).toUpperCase()}
                  </Avatar>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography
                    noWrap
                    variant="h6"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {data.userName}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Paper className={classes.paper}>
              <Grid container>
                <Grid item xs>
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="filled-organization">
                      Organization
                    </InputLabel>
                    <Select
                      native
                      value={details.organization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Organization"
                      inputProps={{
                        name: 'organization',
                        id: 'filled-organization',
                      }}
                    >
                      <option aria-label="None" value="" />
                      {data.organizations.map(org => (
                        <option value={org.id}>{org.name}</option>
                      ))}
                    </Select>
                    <FormHelperText>Select your organization</FormHelperText>
                    {errors.organization && (
                      <span style={{ color: 'red' }}>
                        {errors.organization}
                      </span>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs>
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="filled-project">Project</InputLabel>
                    <Select
                      native
                      value={details.project}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Project"
                      inputProps={{
                        name: 'project',
                        id: 'filled-project',
                      }}
                    >
                      <option aria-label="None" value="" />
                      {projectOptions.map(item => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                    </Select>
                    <FormHelperText>Select your project</FormHelperText>
                    {errors.project && (
                      <span style={{ color: 'red' }}>{errors.project}</span>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <br />
              <Typography variant="caption" align="center" gutterBottom={true}>
                Select the organization and project to send your data
              </Typography>
              <br />
              <br />
              <div className="center-text">
                {/* TODO: lets style this a little differently to emphasize and differentiate from the button below */}
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#3EC28F',
                    color: 'white',
                    marginLeft: '0px',
                  }}
                >
                  Continue
                </Button>
              </div>
            </Paper>
          </div>
        </form>
      </Container>
      <br />
      <Typography variant="body2" align="center" gutterBottom={true}>
        Find more interesting organizations in your neighborhood and across the
        world.
      </Typography>
      <Typography align="center">
        <Button
          variant="contained"
          style={{
            backgroundColor: '#3EC28F',
            marginLeft: '0px',
            color: 'white',
          }}
        >
          <Link
            to="/indev"
            style={{
              color: 'white',
              textDecoration: 'none',
              backgroundColor: '#3ec28f',
            }}
          >
            Directory
          </Link>
        </Button>
      </Typography>
    </div>
  )
}
