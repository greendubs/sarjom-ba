import React, { useContext, useState } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Avatar,
  Container,
  Divider,
  Grid,
} from '@material-ui/core'
import axios from 'axios'
import { Link } from 'gatsby'
import SEO from 'components/common/Seo'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import NativeSelect from '@material-ui/core/NativeSelect'
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
  const [details, setDetails] = useState({
    organization: '',
    project: '',
  })
  const [errors, setErrors] = useState({
    organization: '',
    project: '',
  })

  const headers = { token: data.token, tokenId: data.tokenId }

  console.log(headers)

  // const getProjects = async => {
  try {
    const { response } = axios.get(
      `${process.env.API}/projects`,
      {
        headers: headers,
      },
      {}
    )
    console.log(response)
  } catch (error) {
    console.log(error)
  }
  //}

  const classes = useStyles()

  const handleChange = e => {
    setDetails({ ...details, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value)
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

      if (!organization || !project) {
        setErrors({
          ...errors,
          organization: 'Field is required',
          project: 'Field is required',
        })
      } else {
        //const { data } = await axios.post(`${process.env.API}/login`, {
        //email,
        //password,
        //})
        // store project and organization details in context
        console.log(organization)
        console.log(project)
      }
    } catch (error) {
      setSubmitting(false)
      console.log(error)
    }
  }

  return (
    <div className="container">
      <SEO title="Send Data" />

      <Breadcrumbs separator=">>" aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="textPrimary" href="/app/send" aria-current="page">
          Send Data
        </Link>
      </Breadcrumbs>
      <Container maxWidth="sm" align="center">
        <Typography align="center" variant="h5">
          Select your project
        </Typography>
        <Divider variant="middle" />
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap" spacing={2}>
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
        </div>

        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-organization">Organization</InputLabel>
          <Select
            native
            value={details.organization}
            onChange={handleChange}
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
            {/*<option aria-label="None" value="" />
            <option value={data.organizations.id}>
              {data.organizations.name}
            </option>*/}
          </Select>
          <FormHelperText>Select your organization</FormHelperText>
        </FormControl>
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="filled-project">Project</InputLabel>
          <Select
            native
            value={details.project}
            onChange={handleChange}
            label="Project"
            inputProps={{
              name: 'project',
              id: 'filled-project',
            }}
          >
            {data.organizations.map(org => (
              <option value={org.id}>{org.name}</option>
            ))}
            {/*<option aria-label="None" value="" />
            <option value={data.organizations.id}>
              {data.organizations.name}
            </option>*/}
          </Select>
          <FormHelperText>Select your project</FormHelperText>
        </FormControl>
      </Container>
    </div>
  )
}
