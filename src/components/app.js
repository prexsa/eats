import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';
import { getLocation, fetchGeolocationArea, getFoursquares, getTrending } from '../actions/index';
//import { googleapi } from '../../config';
import { Link } from 'react-router';
import Header from './Header';
import SearchBar from '../containers/SearchBar';
import BusinessList from '../containers/businessList.yelp';
import BusinessDetails from '../containers/businessDetails.yelp';

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
  }

  render() {
    return (
      <div>
        <Header />
        <BusinessDetails />
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
/*
<div>
  <Header />
  <div className="header-container">
    <Link to="/"><h1>Eats</h1></Link>
  </div>
  <p className="phrase">
    Can't Decide, Enter A Seach Location...
  </p>
  <SearchBar />
  <Foursquare />
  {this.props.children}
</div>
*/