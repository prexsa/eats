import React, { Component } from 'react';
import { connect } from 'react-redux';
import { foursquareAreaSearch } from '../actions/index';
import { Input } from 'semantic-ui-react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null
    }
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  };

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')), {
        types: ['(cities)']
      });

    this.autocomplete.addListener('place_changed', this.onPlaceChanged);
  };

  onPlaceChanged() {
    this.place = this.autocomplete.getPlace();
    if (this.place.geometry) {
      const lat = this.place.geometry.location.lat();
      const lng = this.place.geometry.location.lng();
      const geoCoords = {
        lat,lng
      }
      this.setState({ lat, lng });
    } else {
      document.getElementById('autocomplete').placeholder = 'Enter a city';
    }
  };

  componentWillReceiveProps(nextProps, nextState) {
    const lat = nextProps.location.coords.coords.latitude;
    const lng = nextProps.location.coords.coords.longitude;
    this.setState({ lat, lng });
  }

  componentDidUpdate(prevProps, prevState) {
    const coords = {
      lat: this.state.lat,
      lng: this.state.lng
    }
    this.props.foursquareAreaSearch(coords);
  }

  render() {
    return (
      <Input id='autocomplete' className='icon' icon='search' placeholder='Enter a city...' />
    )
  }
}

const mapStateToProps = ({ location }) => {
  return { location }
}

export default connect(mapStateToProps, { foursquareAreaSearch })(SearchBar);
