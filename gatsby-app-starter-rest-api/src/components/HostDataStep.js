import React from 'react'
import { UploadProjectContext } from 'components/UploadProjectContext'
import {
  Grid,
  Container,
  TextField,
  Typography,
  Button,
  Chip,
} from '@material-ui/core'
import { Link, navigate } from 'gatsby'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import InfoIcon from '@material-ui/icons/Info'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default class HostData extends React.Component {
  state = {
    types: ['Metadata Files'],
    license: '',
    checkbox1: false,
    checkbox2: true,
  }

  static contextType = UploadProjectContext

  componentDidMount() {
    this.setState({
      //types: this.context.dataTypes,
      //change this to license: this.context.license, when more available
      license: 'Creative Commons',
    })
    // remove this when more licenses available
    this.context.setLicense('Creative Commons')
    this.context.setDataTypes(['Metadata Files'])
  }

  addItem(item) {
    //console.log(item)
    const newTypes = [...this.state.types, item]
    //console.log(newTypes)
    this.setState(
      {
        types: newTypes,
      },
      () => this.context.setDataTypes(this.state.types)
    )
    //console.log(this.state)
  }

  removeItem(item) {
    const newTypes = this.state.types.filter(_ => _ !== item)
    this.setState(
      {
        types: newTypes,
      },
      () => this.context.setDataTypes(this.state.types)
    )
    // console.log(this.state)
  }

  handleCBChange = e => {
    //console.log(e.target)
    //console.log(e.target.name, e.target.checked)
    if (e.target.name === 'checkbox1') {
      this.setState({ checkbox1: e.target.checked })
      if (e.target.checked) {
        this.addItem('RAW Data Files')
      } else {
        this.removeItem('RAW Data Files')
      }
    } else if (e.target.name === 'checkbox2') {
      this.setState({ checkbox2: e.target.checked })
      if (e.target.checked) {
        this.addItem('Metadata Files')
      } else {
        this.removeItem('Metadata Files')
      }
    }
    // console.log(this.state.types)
    //this.context.setDataTypes([...this.state.types])
    // console.log(this.context)
  }

  render() {
    return (
      <UploadProjectContext.Consumer>
        {value => (
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                <Grid container direction="row" alignItems="center">
                  Select Data Types
                  <ErrorOutlineIcon
                    color="disabled"
                    fontSize="small"
                    style={{ marginLeft: '.5rem' }}
                  />
                </Grid>
              </Typography>
              <Grid container direction="column">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkbox1}
                      key={1}
                      onChange={this.handleCBChange}
                      name="checkbox1"
                      style={{ color: '#3EC28F' }}
                    />
                  }
                  label="RAW Data Files (upload disabled)"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checkbox2}
                      key={2}
                      onChange={this.handleCBChange}
                      name="checkbox2"
                      style={{ color: '#3EC28F' }}
                    />
                  }
                  label="Metadata Files"
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <br />
                <br />
                We store your raw data files and all associated meta data
                mappings separately but uniquely linked to optimize performance.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                <Grid container direction="row" alignItems="center">
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
                  <ErrorOutlineIcon
                    color="disabled"
                    fontSize="small"
                    style={{ marginLeft: '.5rem' }}
                  />
                </Grid>
              </Typography>
              <Select
                variant="outlined"
                defaultValue="Creative Commons"
                // value={this.state.license}
                // onChange={this.changeLicense}
                name="license"
                displayEmpty
              >
                <MenuItem value="Creative Commons">
                  CreativeCommons(CC)
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">
                <br />
                <br />
                Please select the appropriate license to your dataset as it will
                help you decide how to share your data on our platform. Licenses
                cannot be changed to more restrictive types once changed.
              </Typography>
            </Grid>
          </Grid>
        )}
      </UploadProjectContext.Consumer>
    )
  }
}
