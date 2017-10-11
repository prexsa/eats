import React, { Component } from 'react';

const mapStyle = {
  width: 580,
  height: 580
};

export default class BusinessMap extends Component {
  componentDidMount() {
    const lat = this.props.coords.lat;
    const lng = this.props.coords.lng;
    const coordinates = {lat: lat, lng: lng };
    const map = new google.maps.Map(this.refs.map , {
      zoom: 15, 
      center: coordinates
    })

    const marker = new google.maps.Marker({
      position: coordinates,
      map: map
    })
  }

  render() {
    return (
      <div className="map-container" ref="map" style={mapStyle}>
        Maps
      </div>
    )
  }
}