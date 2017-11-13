import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { getLocation, fetchGeolocationArea, getFoursquares, getTrending } from '../actions/index';
//import { googleapi } from '../../config';
import { Link } from 'react-router';
import Header from './Header';
import SearchBar from '../containers/SearchBar';
// import BusinessList from '../containers/businessList.yelp';
import BusinessList from '../containers/businessList.foursquare';
//import BusinessDetails from '../containers/businessDetails.yelp';
import Testing from '../containers/Testing';

class App extends Component {
  state = {
    geolocation: {
      lat: null,
      lng: null
    }
  }
  componentDidMount() {
    //console.log('State: ', this.state)
    //this.props.getLocation();
    this.props.getFoursquares();
  }

  render() {
    return (
      <div>
        <Header />
        <BusinessList />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, location }) => {
  return { auth, location };
}

export default connect(
  mapStateToProps, 
  { getLocation, fetchGeolocationArea, getFoursquares, getTrending })
  (App);
