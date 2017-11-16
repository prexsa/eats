import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLocation } from '../actions/index';
import { Input } from 'semantic-ui-react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
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
// console.log('place: ', this.place)
    if (this.place.geometry) {
      const lat = this.place.geometry.location.lat();
      const lng = this.place.geometry.location.lng();
      const coords = {
        lat,lng
      }
      // dispatch action for location
      this.props.getLocation(coords);
    } else {
      document.getElementById('autocomplete').placeholder = 'Enter a city';
    }
  };

  render() {
    return (
      <Input id='autocomplete' className='icon' icon='search' placeholder='Enter a city...' />
    )
  }
}

export default connect(null, { getLocation })(SearchBar);
