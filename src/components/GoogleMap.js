import React, { Component } from 'react';
//const google = window.google;

class GoogleMaps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    }
  }

  componentDidMount() {
    if(this.props.list === undefined) {
      return false;
    }
    this.setState({list: this.props.list});
    const businessList = this.props.list;

    const lat = this.props.geocenter.lat;
    const lng = this.props.geocenter.lng;
    
    const coordinates = {lat: lat, lng: lng };

    const map = new google.maps.Map(this.refs.map , {
      zoom: 15, 
      center: coordinates
    })

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < businessList.length; i++) {
      const location = businessList[i].venue.location;
      const lat = location.lat;
      const lng = location.lng;  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
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
        <div className="map-container" ref="map">
          Maps
        </div>
      </div>
    )
  }
}

export default GoogleMaps;