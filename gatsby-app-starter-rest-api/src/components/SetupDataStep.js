import React from 'react'
import { ProjectContext } from './ProjectContext'
import { Grid,
         Container, 
         Typography,
         Chip,
         Button,
         Select,
         MenuItem,} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default class SetupData extends React.Component {
  state = {
    dataSelect: "",
    dataTypes: [],
    metaSelect: "",
    metaTypes: [],
    license: ""
  }

  static contextType = ProjectContext

  componentDidMount() {
    this.setState({
      dataSelect: "",
      dataTypes: this.context.dataTypes,
      metaSelect: "",
      metaTypes: this.context.metaData,
      //change this to license: this.context.license, when more available
      license: "Creative Commons" 
    })
    // remove this when more licenses available
    this.context.setLicense("CreativeCommons")
  }



  handleNewDataType = (e) => {
    this.setState({
      dataSelect: e.target.value
    })
  }

  addDataType() {
    //prevents dupes and blanks
    if (this.state.dataSelect !== "" && 
       (this.state.dataTypes.length === 0 || 
       !(this.state.dataTypes.includes(this.state.dataSelect)))) {     
      this.context.setDataTypes([...this.state.dataTypes, this.state.dataSelect])
        this.setState(prevState => ({
        dataTypes: [...prevState.dataTypes, prevState.dataSelect], 
      }))
    }
    this.setState({
      dataSelect: ""
    })
  }

  deleteDataChip(index) {
    let updated = this.state.dataTypes.filter((_, i) => i !== index)
    this.setState({
      dataTypes: updated
    })
    this.context.setDataTypes(updated)
  }

  handleNewMetaType = (e) => {
    this.setState({
      metaSelect: e.target.value
    })
  }

  addMetaType() {
    //prevents dupes and blanks
    if (this.state.metaSelect !== "" && 
       (this.state.metaTypes.length === 0 || 
       !(this.state.metaTypes.includes(this.state.metaSelect)))) {     
      this.context.setMetaData([...this.state.metaTypes, this.state.metaSelect])
        this.setState(prevState => ({
        metaTypes: [...prevState.metaTypes, prevState.metaSelect], 
      }))
    }
    this.setState({
      metaSelect: ""
    })
  }

  deleteMetaChip(index) {
    let updated = this.state.metaTypes.filter((_, i) => i !== index)
    this.setState({
      metaTypes: updated
    })
    this.context.setMetaData(updated)
  }

  changeLicense = (e) => {
    this.setState({
      license: e.target.value
    })
  }

  componentDidUpdate() {
    //console.log(this.state)
  }

  render() {
    return (
      <ProjectContext.Consumer>
        { value => ( 
          <Grid container spacing={3}>  
            <Grid item xs={6}>
              <Typography variant='h6' gutterBottom>
                <Grid container direction='row' alignItems='center'>
                Select Data Types
                <ErrorOutlineIcon  color='disabled' fontSize='small' style={{ marginLeft: '.5rem'}}/>
                </Grid>
              </Typography>
              <Select
                variant="outlined"
                value={this.state.dataSelect}
                onChange={this.handleNewDataType}
                name="dataType"
                displayEmpty
              >
                <MenuItem value="" disabled>Select File Types</MenuItem>
                <MenuItem value="Images">Images</MenuItem>
              </Select>
              <Button
                variant="contained"
                style={{ backgroundColor: `#3EC28F`, color: 'white'}}
                onClick={() => this.addDataType()}>
                Add
              </Button>
              <br/>
              <div>
                {this.state.dataTypes.map((type, index) => (
                  <Chip
                    size='medium'
                    label={type}
                    onDelete={() => this.deleteDataChip(index)}
                    style={{margin: '.75rem',}}
                  >
                  </Chip>
                ))}
              </div>
            </Grid>
            <Grid item xs={6}>
              <br/>
              <Typography variant='body2'>
                Select the types of data files that will be added by volunteers in your project.
                Currently we support only images.
              </Typography>           
            </Grid>
            <Grid item xs={6}>
              <Typography variant='h6' gutterBottom>
                <Grid container direction='row' alignItems='center'>
                Select Meta Data
                <ErrorOutlineIcon  color='disabled' fontSize='small' style={{ marginLeft: '.5rem'}}/>
                </Grid>
              </Typography>
              <Select
                variant="outlined"
                value={this.state.metaSelect}
                onChange={this.handleNewMetaType}
                name="metaData"
                displayEmpty
              >
                <MenuItem value="" disabled>Select Meta Deta Files</MenuItem>
                <MenuItem value="Location">Location</MenuItem>
                <MenuItem value="Date">Date</MenuItem>
              </Select>
              <Button
                variant="contained"
                style={{ backgroundColor: `#3EC28F`, color: 'white'}}
                onClick={() => this.addMetaType()}>
                Add
              </Button>
              <br/>
              <div>
                {this.state.metaTypes.map((type, index) => (
                  <Chip
                    size='medium'
                    label={type}
                    onDelete={() => this.deleteMetaChip(index)}
                    style={{margin: '.75rem',}}
                  >
                  </Chip>
                ))}
              </div>
            </Grid>
            <Grid item xs={6}>
              <br/>
              <Typography variant='body2'>
                Select the meta data files that will be added by volunteers in your project.
                Currently we only support csv and excel files.
              </Typography> 
            </Grid>
            <Grid item xs={6} >
              <Typography variant='h6' gutterBottom>
                <Grid container direction='row' alignItems='center'>
                Attach License
                <ErrorOutlineIcon  color='disabled' fontSize='small' style={{ marginLeft: '.5rem'}}/>
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
                <MenuItem value="Creative Commons">CreativeCommons(CC)</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <br/>
              <Typography variant='body2'>
                Please select the appropriate license for your project as it will help us
                decide how to share your data on our platform. Licenses cannot be changed
                to more restrictive types once changed. Click here to read more.
              </Typography> 
            </Grid>
          </Grid>
        )}
      </ProjectContext.Consumer>
    )
  }
}
