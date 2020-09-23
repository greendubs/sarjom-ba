import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import { googleAPIKey } from 'components/Keys'
import { Typography } from '@material-ui/core'
import moment from 'moment'

export class MapWithMarkers extends React.Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    newCenter: { lat: 47.391, lng: -122.18 },
  }

  //Do we need to remove contributors with no location?

  constructor(props) {
    super(props)
    this.state = {
      newCenter: { lat: 47.391, lng: -122.18 },
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false,
    }
    // console.log(this.props.files)
  }

  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    })

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    })

  onMapClicked = (mapProps, map) => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      })
    console.log(this.props.files)
    console.log(this.state.newCenter)
    this.map = map
    if (this.props.files.length > 0) {
      this.setState((state, props) => ({
        newCenter: {
          lat: props.files.find(
            _ => _.latitude !== null && _.longitude !== null
          ).latitude,
          lng: props.files.find(
            _ => _.latitude !== null && _.longitude !== null
          ).longitude,
        },
      }))
    }

    //console.log(this.state.newCenter)
    map.setCenter(this.state.newCenter)
  }

  render() {
    if (!this.props.loaded) return <div>Loading...</div>
    return (
      <Map
        item
        xs={9}
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: '75vh', position: 'relative', width: '50vw' }}
        containerStyle={{ position: 'relative' }}
        zoom={14}
        center={
          this.state.newCenter
            ? this.state.newCenter
            : { lat: 47.391, lng: -122.18 }
        }
      >
        {this.props.files.map(file => (
          <Marker
            name={file.uploadedByUser.name}
            fileLoc={file.fileLink}
            fileDate={moment(file.createdAt).format('MM-DD-yyyy')}
            location={'(' + file.latitude + ',' + file.longitude + ')'}
            onClick={this.onMarkerClick}
            position={{ lat: file.latitude, lng: file.longitude }}
          />
        ))}

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <Typography variant="caption">
              <em>Contributor: </em>
              <b>{this.state.selectedPlace.name}</b>
            </Typography>
            <br />
            <Typography variant="caption">
              <em>Image: </em>
              {this.state.selectedPlace.fileLoc}
            </Typography>
            <br />
            <Typography variant="caption">
              <em>Date: </em>
              {this.state.selectedPlace.fileDate}
            </Typography>
            <br />
            <Typography variant="caption">
              <em>Location: </em>
              {this.state.selectedPlace.location}
            </Typography>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: googleAPIKey,
})(MapWithMarkers)
