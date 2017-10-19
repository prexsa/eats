import React, { Component } from 'react';

const mapStyle = {
  width: 800,
  height: 680
};

//const google = window.google;

class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.list === undefined) {
      return false;
    }
    this.setState({list: nextProps.list});
    const businessList = nextProps.list;

    const lat = nextProps.geocenter.lat;
    const lng = nextProps.geocenter.lng;
    
    const coordinates = {lat: lat, lng: lng };

    const map = new google.maps.Map(this.refs.map , {
      zoom: 13, 
      center: coordinates
    })

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < businessList.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(businessList[i].coordinates.latitude, businessList[i].coordinates.longitude),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(businessList[i].name);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  }

  render() {
    return(
      <div className="google-maps">
        <div className="map-container" ref="map" style={mapStyle}>
          Maps
        </div>
        <div className="clear"></div>
      </div>
    )
  }
}

export default GoogleMaps;