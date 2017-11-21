import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLocation, yelpTransactionType } from '../actions/index';
import { Link } from 'react-router';
import Header from './Header';
import SearchBar from '../containers/SearchBar';
import BusinessList from '../containers/businessList.yelp';
//import BusinessList from '../containers/businessList.foursquare';
//import BusinessDetails from '../containers/businessDetails.yelp';
//import Testing from '../containers/Testing';
import TransactionList from '../containers/transactionList.yelp';
import Favorites from '../components/Favorites';

class App extends Component {
  componentDidMount() {
    this.props.getLocation();
    this.props.yelpTransactionType();
  }

  render() {
    return (
      <div>
        <Header />
        <TransactionList />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, location }) => {
  return { auth, location };
}

export default connect(
  mapStateToProps, 
  { getLocation, yelpTransactionType })
  (App);
