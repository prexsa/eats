import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRestaurant } from '../actions/index.js';
import { Link } from 'react-router';
import { googleapi } from '../../config.js';

import TextField from 'material-ui/TextField';
import ActionSearch from 'material-ui/svg-icons/action/search';
import MapPlace from 'material-ui/svg-icons/maps/place';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';


// http://geobytes.com/free-ajax-cities-jsonp-api/
// https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete

class SearchBar extends Component {
  constructor(props) {
    super(props);
    
    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  render() {
    return (
      <div className="searchbar-container">
        <form onSubmit={this.onFormSubmit}>
          <Toolbar style={{'height': 47}}>
            <ToolbarGroup>
              <ActionSearch />
            </ToolbarGroup>
            <ToolbarGroup>
                <TextField
                  id="city-suggest"
                  placeholder="Enter a location" 
                  underlineStyle={{'left': -25}}
                  inputStyle={{'left': -25}}
                  underlineFocusStyle={{'left': -25}}
                  value={this.state.term}
                  onChange={this.onInputChange}
                 />
                <FlatButton
                  backgroundColor="#a4c639"
                  hoverColor="#8AA62F"  
                  label="Search"
                  style={{'height': 47, 'marginRight': -24, 'minWidth': 115}}
                  type="submit"
                />
            </ToolbarGroup>
          </Toolbar>
        </form>
      </div>
    )
  }

  onInputChange(e) {
    const input = document.getElementById('city-suggest');
    const googleAutocomplete = new google.maps.places.Autocomplete(input);
    this.setState({ term: e.target.value });
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.fetchRestaurant(this.state.term);
    this.setState({ term: '' })
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRestaurant }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);

/*window.addEventListener('load', () => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src  = `https://maps.googleapis.com/maps/api/js?key=${googleapi}&libraries=places`;
  document.body.appendChild(script);
});*/