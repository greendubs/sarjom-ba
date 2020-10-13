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

export default class MapDataSelect extends React.Component {
  state = {
    metaSelect: '',
    fileNames: [],
    selectColumns: {},
    clicked: [],
  }

  static contextType = UploadProjectContext

  componentDidMount() {
    this.setState({
      metaSelect: '',
      fileNames: Object.keys(this.context.metaJoinColumns),
      selectColumns: {},
      clicked: Object.keys(this.context.metaJoinColumns).map(file => [
        ...Array(this.context.metaFileHeaders[file].length)
          .fill()
          .map(x => false),
      ]),
    })
    // console.log(this.state)
  }

  handleNewMetaFile = e => {
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
    // console.log(newClicked)
    this.setState(prevState => ({
      clicked: newClicked,
    }))
    // console.log(outerIndex, file, field, innerIndex)
    if (this.state.selectColumns.hasOwnProperty(file)) {
      if (this.state.selectColumns[file].includes(field)) {
        const newColumns = this.state.selectColumns[file].filter(
          _ => _ !== field
        )
        this.setState(
          {
            selectColumns: { ...this.state.selectColumns, [file]: newColumns },
          },
          () => {
            this.context.setMetaSelectColumns(this.state.selectColumns)
          }
        )
      } else {
        const newColumns = [...this.state.selectColumns[file], field]
        this.setState(
          {
            selectColumns: { ...this.state.selectColumns, [file]: newColumns },
          },
          () => {
            this.context.setMetaSelectColumns(this.state.selectColumns)
          }
        )
      }
    } else {
      const { ...newSelectColumns } = this.state.selectColumns
      newSelectColumns[file] = [field]
      this.setState(
        {
          selectColumns: newSelectColumns,
        },
        () => {
          this.context.setMetaSelectColumns(this.state.selectColumns)
        }
      )
    }

    //console.log(this.state)
    //console.log(this.context)
  }

  addMetaFile() {
    //prevents dupes and blanks
    if (
      this.state.metaSelect !== '' &&
      (this.state.fileNames.length === 0 ||
        !this.state.fileNames.includes(this.state.metaSelect))
    ) {
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

    if (this.state.selectColumns.hasOwnProperty(fileName)) {
      const { [fileName]: _, ...newSelectColumns } = this.state.selectColumns
      this.setState({ selectColumns: newSelectColumns })
      this.context.setMetaSelectColumns(newSelectColumns)
    }

    if (this.context.joinColumns.hasOwnProperty(fileName)) {
      const { [fileName]: _, ...newJoinColumns } = this.context.joinColumns
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
                Map Metadata - Select
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
                        {this.context.metaFileHeaders[name].map((col, ind) =>
                          this.context.metaJoinColumns[name].includes(col) ? (
                            <Chip
                              size="medium"
                              icon={<AddIcon style={{ color: 'white' }} />}
                              label={col}
                              key={ind}
                              style={{
                                backgroundColor: 'orange',
                                color: 'white',
                                margin: '0.5rem',
                              }}
                            />
                          ) : (
                            <Chip
                              size="medium"
                              icon={<AddIcon style={{ color: 'white' }} />}
                              label={col}
                              key={ind}
                              style={{
                                backgroundColor: !this.state.clicked[index][ind]
                                  ? `#3EC28F`
                                  : `#0078FF`,
                                color: 'white',
                                margin: '0.5rem',
                              }}
                              onClick={() =>
                                this.handleButtonClick(index, name, col, ind)
                              }
                            ></Chip>
                          )
                        )}
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
                Joined columns are already selected in the previous screen and
                are displayed in orange color.
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h6">Data Mappings - Join</Typography>
              <br />
              <Typography variant="body2">
                Click on the labels to select them. <b>Select</b> will allow you
                to select multiple columns across files. Blue color represents
                selected columns.
              </Typography>
              <br />
              <Chip
                size="medium"
                icon={<AddIcon style={{ color: 'white' }} />}
                label="Select"
                key="select"
                style={{
                  backgroundColor: `#0078FF`,
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
