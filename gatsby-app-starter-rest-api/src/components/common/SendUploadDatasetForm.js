import React, { useContext, useState, useEffect } from 'react'
import { Button, Typography, Container, Grid } from '@material-ui/core'
import axios from 'axios'
import { Link, navigate } from 'gatsby'
import SEO from 'components/common/Seo'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Context from 'components/common/Context'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import InfoIcon from '@material-ui/icons/Info'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import ClearIcon from '@material-ui/icons/Clear'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import moment from 'moment'
import GoogleMaps from 'components/common/GoogleMaps'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Chip from '@material-ui/core/Chip'
import CommentIcon from '@material-ui/icons/Comment'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { filesConfig } from 'components/Keys'
import S3 from 'react-aws-s3'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PriorityHighIcon from '@material-ui/icons/PriorityHigh'

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
  input: {
    display: 'none',
  },
  subheading: {
    textAlign: 'left',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(10),
    width: 300,
  },
  button: {
    margin: theme.spacing(1),
  },
}))

const commonBirds = [
  { name: 'Bird' },
  { name: 'Crow' },
  { name: 'Peacock' },
  { name: 'Dove' },
  { name: 'Sparrow' },
  { name: 'Goose' },
  { name: 'Ostrich' },
  { name: 'Pigeon' },
  { name: 'Turkey' },
  { name: 'Hawk' },
  { name: 'Bald eagle' },
  { name: 'Raven' },
  { name: 'Parrot' },
  { name: 'Flamingo' },
  { name: 'Seagull' },
  { name: 'Swallow' },
  { name: 'Blackbird' },
  { name: 'Penguin' },
  { name: 'Robin' },
  { name: 'Swan' },
  { name: 'Owl' },
  { name: 'Stork' },
  { name: 'Woodpecker' },
  { name: 'Animal' },
  { name: 'Duck' },
  { name: 'Waterfowl' },
  { name: 'Quail' },
  { name: 'Pheasant' },
  { name: 'Grouse' },
  { name: 'Grebe' },
  { name: 'Cuckoo' },
  { name: 'Swift' },
  { name: 'Hummingbird' },
  { name: 'Rail' },
  { name: 'Gallinule' },
  { name: 'Coot' },
  { name: 'Crane' },
  { name: 'Stilt' },
  { name: 'Avocet' },
  { name: 'Oystercatcher' },
  { name: 'Plover' },
  { name: 'Sandpiper' },
  { name: 'Skua' },
  { name: 'Jaeger' },
  { name: 'Gull' },
  { name: 'Tropicbird' },
  { name: 'Loon' },
  { name: 'Albatross' },
  { name: 'Petrel' },
  { name: 'Shaearwater' },
]

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
}

export default function SendUploadDatasetForm() {
  const { data } = useContext(Context)
  const [isSubmitting, setSubmitting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [changeIndex, setChangeIndex] = useState(0)
  const [uploaded, setUploaded] = useState(false)
  const [open, setOpen] = useState(false)

  const [details, setDetails] = useState({
    image_links: [],
    license: '',
    metaDate: moment().format('yyyy-MM-DD'),
    tags: [],
    comment: '',
  })
  const [previewImages, setPreviewImages] = useState([])
  const [uploadImages, setUploadImages] = useState([])
  const [location, setLocation] = React.useState({ lat: '', lng: '' })
  const [errors, setErrors] = useState({
    images: '',
    license: '',
    location: '',
    metaDate: '',
    tags: '',
    comment: '',
  })

  const classes = useStyles()

  const headers = { token: data.token, tokenId: data.tokenId }

  //console.log(changeIndex)

  const handleChange = e => {
    setDetails({ ...details, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value)
  }

  const handleCommentChange = e => {
    console.log(e.target.value.length)
    if (e.target.value.length <= 250) {
      setDetails({ ...details, [e.target.name]: e.target.value })
      console.log(e.target.name, e.target.value)
      if (errors.comment) {
        setErrors({ ...errors, [e.target.name]: '' })
      }
    } else {
      setErrors({ ...errors, [e.target.name]: 'Only 250 characters allowed' })
    }
  }

  const handleImagesChange = e => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      console.log(files)

      let totalSize = 0

      const types = ['image/png', 'image/jpeg', 'image/jpg']

      files.forEach((file, i) => {
        // #2 Catching wrong file types on the client
        if (types.every(type => file.type !== type)) {
          setErrors({
            ...errors,
            images: `'${file.type}' is not a supported format`,
          })
        }

        // #3 Catching files that are too large on the client
        //if (file.size > 150000) {
        //setErrors({
        //...errors,
        //images: `'${file.name}' is too large, please pick a smaller file`,
        //})
        //}
        totalSize += file.size
      })

      if (totalSize > 2147483648) {
        setErrors({
          ...errors,
          images: 'Total size of files is greater than 2GB.',
        })
      }

      /* Map each file to a promise that resolves to an array of image URI's */

      Promise.all(
        files.map(file => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.addEventListener('load', ev => {
              resolve(ev.target.result)
            })
            reader.addEventListener('error', reject)
            reader.readAsDataURL(file)
          })
        })
      ).then(
        images => {
          /* Once all promises are resolved, update state with image URI array */
          console.log(images)
          setPreviewImages(images)
          setUploadImages(files)
          setChangeIndex(0)
          setProgress(0)
          setUploaded(false)
          console.log(uploadImages)
        },
        error => {
          console.error(error)
          setErrors({ ...errors, images: error })
        }
      )
    }
  }

  const handleClear = e => {
    let newPreviewImages = previewImages.filter(
      (_, index) => index !== changeIndex
    )
    let newUploadImages = uploadImages.filter(
      (_, index) => index !== changeIndex
    )
    setPreviewImages(newPreviewImages)
    setUploadImages(newUploadImages)
    console.log(uploadImages)
    if (changeIndex > newPreviewImages.length - 1) {
      setChangeIndex(changeIndex - 1)
    }
  }

  const handleUploadImages = e => {
    console.log(uploadImages)
    const ReactS3Client = new S3(filesConfig)
    const s3_links = []
    uploadImages.map((image, ind) => {
      ReactS3Client.uploadFile(
        image,
        data.sendProjectId.concat(
          '/',
          image.name.substring(0, image.name.indexOf('.'))
        )
      )
        .then(response => {
          console.log(response)
          s3_links.push(response.location)
        })
        .catch(error => {
          console.log(error)
          setErrors({ ...errors, images: error })
        })
      setProgress(((ind + 1) * 100) / uploadImages.length)
    })
    console.log(s3_links)
    setDetails({ ...details, image_links: s3_links })
    setUploaded(true)
  }

  const handleBlur = e => {
    if (!e.target.value) {
      setErrors({ ...errors, [e.target.name]: 'Required field' })
    }
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleClickOkay = () => {
    setOpen(false)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

    //console.log(e)
    try {
      const { image_links, license, metaDate, tags, comment } = details
      console.log(license)
      console.log(metaDate)
      console.log(tags)
      console.log(comment)
      console.log(image_links)
      console.log(location.lat)
      console.log(location.lng)
      console.log(data.sendProjectName)

      if (!image_links || !license || !metaDate || !location) {
        console.log('Reached errors')
        setErrors({
          ...errors,
          images: 'Field is required',
          license: 'Field is required',
          metaDate: 'Field is required',
          location: 'Field is required',
        })
      } else {
        // store project and organization details in context
        image_links.map(link => {
          ;(async () => {
            try {
              const response = await axios.post(
                `${process.env.API}/files`,
                {
                  projectId: data.sendProjectId,
                  name: data.sendProjectName,
                  fileLink: link,
                  comments: comment,
                  customTags: tags,
                  latitude: location.lat,
                  longitude: location.lng,
                  license: license,
                  fileType: 'RAW_DATA',
                  createdAt: metaDate,
                },
                {
                  headers: headers,
                }
              )
              console.log('response recieved is')
              console.log(response)
            } catch (error) {
              console.log(error)
            }
          })()
        })

        navigate('../complete')
      }
    } catch (error) {
      setSubmitting(false)
      console.log(error)
    }
  }
  //useEffect(() => {
  //const timer = setInterval(() => {
  //setProgress(prevProgress =>
  //prevProgress >= 100 ? 10 : prevProgress + 10
  //)
  //}, 800)
  //return () => {
  //clearInterval(timer)
  //}
  //}, [])

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
      <Container maxWidth="md" align="center">
        <Grid container className={classes.root} spacing={1}>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <Typography variant="h6" className={classes.subheading}>
                Attach Datasets
              </Typography>
              <Typography variant="caption">
                Select and upload all the datasets to send to your project. You
                should have received instructions on uploading the data files to
                your project.
              </Typography>
              <br />
              <br />
              <Typography variant="caption">
                Maximum size of all files allowed 2GB.{' '}
              </Typography>
              <br />
              <Typography variant="caption" style={{ fontWeight: 'bold' }}>
                Files allowed:{' '}
                <span>
                  <Typography variant="caption">
                    Images (JPG/JPEG/PNG)
                  </Typography>
                </span>
              </Typography>
              <br />
              <br />
              <div className={classes.root}>
                <input
                  type="file"
                  id="contained-button-file"
                  name="images"
                  accept="image/*"
                  className={classes.input}
                  onChange={handleImagesChange}
                  onBlur={handleBlur}
                  multiple
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    color="primary"
                    style={{
                      backgroundColor: '#3EC28F',
                      marginRight: '1rem',
                    }}
                  >
                    Select Images
                  </Button>
                </label>
              </div>
            </Grid>
            <Grid item xs={4}>
              <Card className={classes.root}>
                <CardContent className={classes.content}>
                  <Typography variant="h6">Preview</Typography>
                </CardContent>
                {previewImages.length >= 1 ? (
                  <img
                    className="image-uploaded"
                    src={previewImages[changeIndex]}
                    alt="preview"
                  />
                ) : (
                  <IconButton aria-label="preview">
                    <ViewCarouselIcon style={{ fontSize: 120 }} />
                  </IconButton>
                )}
                <br />
                {errors.images && (
                  <span style={{ color: 'red' }}>{errors.images}</span>
                )}
                <div className={classes.controls}>
                  <IconButton
                    aria-label="previous"
                    disabled={changeIndex <= 0}
                    onClick={() => setChangeIndex(changeIndex - 1)}
                  >
                    <KeyboardArrowLeft />
                  </IconButton>
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<ClearIcon />}
                    size="medium"
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                  <IconButton
                    aria-label="next"
                    disabled={changeIndex >= previewImages.length - 1}
                    onClick={() => setChangeIndex(changeIndex + 1)}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </div>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" className={classes.subheading}>
                Default Metadata
              </Typography>
              <GoogleMaps
                name="location"
                location={location}
                setLocation={setLocation}
              />
              {errors.location && (
                <span style={{ color: 'red' }}>{errors.location}</span>
              )}
              <br />
              <TextField
                id="standard-date"
                label="Date"
                type="date"
                defaultValue={details.metaDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ name: 'metaDate', id: 'standard-date' }}
                onChange={handleChange}
              />
              {errors.metaDate && (
                <span style={{ color: 'red' }}>{errors.metaDate}</span>
              )}
              <br />
              <Autocomplete
                multiple
                id="tags-custom"
                style={{ width: 300 }}
                options={commonBirds.map(option => option.name)}
                freeSolo
                name="tags"
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Add your own tags (5 max.)"
                    placeholder="Type here"
                  />
                )}
                onChange={(event, newValue) => {
                  console.log(newValue.length)
                  if (newValue.length <= 5) {
                    setDetails({ ...details, tags: newValue })
                    if (errors.tags) {
                      setErrors({ ...errors, tags: '' })
                    }
                  } else {
                    setErrors({
                      ...errors,
                      tags: 'Only 5 tags are allowed now',
                    })
                  }
                }}
              />
              {errors.tags && (
                <span style={{ color: 'red' }}>{errors.tags}</span>
              )}
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography variant="h6" className={classes.subheading}>
                Attach License{' '}
                <span>
                  {' '}
                  <Tooltip placement="top" title="Click for more information">
                    <Link to="/data-licenses/">
                      <IconButton aria-label="information">
                        <InfoIcon style={{ color: '#3EC28f' }} />
                      </IconButton>
                    </Link>
                  </Tooltip>
                </span>
              </Typography>
              {errors.license && (
                <span style={{ color: 'red' }}>{errors.license}</span>
              )}
              <Typography variant="caption">
                We use creative common license for your data. It is safe and
                secure within your community.
              </Typography>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="filled-license">License</InputLabel>
                <Select
                  native
                  value={details.license}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputProps={{
                    name: 'license',
                    id: 'filled-license',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={'Creative Commons'}>
                    "Creative Commons (CC)"
                  </option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                disabled={previewImages.length < 1}
                onClick={handleUploadImages}
                style={{
                  backgroundColor: '#3EC28F',
                  marginLeft: 0,
                }}
              >
                Upload Images
              </Button>
              <br />
              <br />
              {uploadImages.length >= 1 && (
                <CircularProgressWithLabel
                  value={progress}
                  style={{ color: '#3EC28F' }}
                />
              )}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6" className={classes.subheading}>
                Comment{' '}
                <span>
                  {' '}
                  <IconButton aria-label="comment">
                    <CommentIcon style={{ color: '#3EC28f' }} />
                  </IconButton>
                </span>
              </Typography>
              <TextareaAutosize
                rowsMin={1}
                rowsMax={2}
                aria-label="comment"
                placeholder="250 characters max."
                name="comment"
                onChange={handleCommentChange}
              />
              {errors.comment && (
                <span style={{ color: 'red' }}>{errors.comment}</span>
              )}
              <br />
              <br />
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={true}
                        onChange={handleChange}
                        name="autoApply"
                        color="primary"
                        style={{ color: '#3EC28F' }}
                        fontSize="small"
                      />
                    }
                    label="Apply metadata to all files"
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    aria-label="information"
                    onClick={handleClickOpen}
                  >
                    <PriorityHighIcon style={{ color: '#3EC28f' }} />
                  </IconButton>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {'Information about metadata'}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        The metadata will be applied to all the images uploaded.
                        Individual metadata to each image is not supported now.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={handleClickOkay}
                        color="primary"
                        autoFocus
                      >
                        Okay
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  style={{
                    backgroundColor: '#3EC28F',
                    color: 'white',
                    float: 'right',
                  }}
                >
                  Send
                </Button>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <br />
    </div>
  )
}
