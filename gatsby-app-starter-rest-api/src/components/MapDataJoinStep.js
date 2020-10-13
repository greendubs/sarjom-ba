import React from 'react'
import { UploadProjectContext } from './UploadProjectContext'
import {
  Grid,
  Card,
  Typography,
  Chip,
  Button,
  Select,
  MenuItem,
} from '@material-ui/core'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

export default class MapDataJoin extends React.Component {
  state = {
    metaSelect: '',
    fileNames: [],
    joinColumns: {},
    clicked: [],
  }

  static contextType = UploadProjectContext

  componentDidMount() {
    this.setState({
      metaSelect: '',
      fileNames: [],
      joinColumns: {},
      clicked: [],
    })
  }

  handleNewMetaFile = (e, key) => {
    this.setState({
      metaSelect: e.target.value,
    })
  }

  handleButtonClick = (outerIndex, file, field, innerIndex) => {
    const newClicked = this.state.clicked.slice(0)
    // console.log(newClicked)
    newClicked[outerIndex][innerIndex] = !this.state.clicked[outerIndex][
      innerIndex
    ]
    //console.log(newClicked)
    this.setState(prevState => ({
      clicked: newClicked,
    }))
    // console.log(outerIndex, file, field, innerIndex)
    if (this.state.joinColumns.hasOwnProperty(file)) {
      if (this.state.joinColumns[file].includes(field)) {
        const newColumns = this.state.joinColumns[file].filter(_ => _ !== field)
        this.setState(
          {
            joinColumns: { ...this.state.joinColumns, [file]: newColumns },
          },
          () => {
            this.context.setMetaJoinColumns(this.state.joinColumns)
          }
        )
      } else {
        const newColumns = [...this.state.joinColumns[file], field]
        // console.log(newColumns)
        this.setState(
          {
            joinColumns: { ...this.state.joinColumns, [file]: newColumns },
          },
          () => {
            this.context.setMetaJoinColumns(this.state.joinColumns)
          }
        )
      }
    } else {
      const { ...newJoinColumns } = this.state.joinColumns
      newJoinColumns[file] = [field]
      this.setState(
        {
          joinColumns: newJoinColumns,
        },
        () => {
          this.context.setMetaJoinColumns(this.state.joinColumns)
        }
      )
    }
    //const joinColumns = { ...this.state.joinColumns }
    //console.log(joinColumns)
    //this.context.setMetaJoinColumns(joinColumns)
    // console.log(this.state)
    // console.log(this.context)
  }

  addMetaFile() {
    //prevents dupes and blanks
    if (
      this.state.metaSelect !== '' &&
      (this.state.fileNames.length === 0 ||
        !this.state.fileNames.includes(this.state.metaSelect))
    ) {
      //  this.context.setMetaData([...this.state.metaTypes, this.state.metaSelect])
      // console.log(this.context)
      const clicks = [
        ...Array(this.context.metaFileHeaders[this.state.metaSelect].length)
          .fill()
          .map(x => false),
      ]
      // console.log(clicks)
      this.setState(prevState => ({
        fileNames: [...prevState.fileNames, prevState.metaSelect],
        clicked: [...prevState.clicked, clicks],
      }))
      // this.readHeader()
    }
    this.setState({
      metaSelect: '',
    })
  }

  deleteMetaChip(index) {
    let fileName = this.state.fileNames[index]

    let updated = this.state.fileNames.filter((_, i) => i !== index)
    this.setState({
      fileNames: updated,
    })
    let updatedClicks = this.state.clicked.filter((_, i) => i !== index)
    this.setState({ clicked: updatedClicks })
    //this.context.setMetaData(updated)

    if (this.state.joinColumns.hasOwnProperty(fileName)) {
      const { [fileName]: _, ...newJoinColumns } = this.state.joinColumns
      this.setState({ joinColumns: newJoinColumns })
      this.context.setMetaJoinColumns(newJoinColumns)
    }
  }

  componentDidUpdate() {
    //console.log(this.state)
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    //this.setState = (state, callback) => {
    //return
    //}
  }

  render() {
    return (
      <UploadProjectContext.Consumer>
        {value => (
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography variant="h6" gutterBottom>
                Map Metadata - Join
                <ErrorOutlineIcon
                  color="disabled"
                  fontSize="small"
                  style={{ marginLeft: '.5rem' }}
                />
              </Typography>
              <Typography variant="body2" gutterBottom>
                Fetch headers (column names) from the CSV files (max. 4). Select
                files in order.
              </Typography>
              <Select
                variant="outlined"
                value={this.state.metaSelect}
                onChange={this.handleNewMetaFile}
                name="metaDataFiles"
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Metadata Files
                </MenuItem>
                {this.context.metaFileNames.map((name, index) => (
                  <MenuItem key={index} value={name} id={index}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                style={{ backgroundColor: `#3EC28F`, color: 'white' }}
                onClick={() => this.addMetaFile()}
              >
                Add CSV File headers
              </Button>
              <br />
              <br />
              <Grid container spacing={3}>
                {this.state.fileNames.map((name, index) => (
                  <Grid item>
                    <Card variant="outlined" style={{ maxWidth: 300 }}>
                      <CardHeader
                        action={
                          <IconButton
                            aria-label="close"
                            onClick={() => this.deleteMetaChip(index)}
                          >
                            <CloseIcon />
                          </IconButton>
                        }
                        title={name}
                        titleTypographyProps={{
                          variant: 'subtitle2',
                        }}
                      />
                      <CardActions style={{ flexWrap: 'wrap', margin: '1rem' }}>
                        {this.context.metaFileHeaders[name].map((col, ind) => (
                          <Chip
                            size="medium"
                            icon={<AddIcon style={{ color: 'white' }} />}
                            label={col}
                            key={ind}
                            style={{
                              backgroundColor: !this.state.clicked[index][ind]
                                ? `#3EC28F`
                                : 'orange',
                              color: 'white',
                              margin: '0.5rem',
                            }}
                            onClick={() =>
                              this.handleButtonClick(index, name, col, ind)
                            }
                          ></Chip>
                        ))}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Grid container direction="row">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={true}
                      key={1}
                      name="checkbox1"
                      style={{ color: '#3EC28F' }}
                      disabled
                    />
                  }
                  label="Some options"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={true}
                      key={2}
                      name="checkbox2"
                      style={{ color: '#3EC28F' }}
                      disabled
                    />
                  }
                  label="Skip blank/unmatched files, generate logs"
                />
              </Grid>
              <br />
              <br />
              <Typography variant="body2">
                {' '}
                {/*Need to update to 2 connecctions per header */}
                Currently, joins are limited to a maximum of{' '}
                <b>1 connection per header</b> to reduce the complexity of
                joins.
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">Data Mappings - Join</Typography>
              <br />
              <Typography variant="body2">
                Click on the labels to select them. <b>Join</b> will allow you
                to join/merge files on selected columns. Orange color represents
                columns selected for joining files.
              </Typography>
              <br />
              <Chip
                size="medium"
                icon={<AddIcon style={{ color: 'white' }} />}
                label="Join"
                key="join"
                style={{
                  backgroundColor: 'orange',
                  color: 'white',
                  margin: '0.5rem',
                }}
              ></Chip>
              <br />
              <Typography variant="body2">
                You can click on the file name to see a preview of the dataset.
                (Disabled now)
              </Typography>
            </Grid>
          </Grid>
        )}
      </UploadProjectContext.Consumer>
    )
  }
}
