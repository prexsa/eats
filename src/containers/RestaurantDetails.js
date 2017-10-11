import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBusinessHours, fetchBusinessReviews, fetchScrape } from '../actions/index.js'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Hours from '../containers/Hours';
import Reviews from '../containers/Reviews';
import BusinessInfo from '../containers/BusinessInfo';
import BusinessMap from '../containers/BusinessMap';

class RestaurantDetails extends Component {
  render() {
    const { restaurants } = this.props;
    if(!restaurants[0]) {
      return <div></div>;
    }
    console.log('restaurants ', restaurants)
    const businesses = restaurants[0].businesses;
    const selected = businesses[0];
    const coords = {
      lat: selected.coordinates.latitude,
      lng: selected.coordinates.longitude
    }
    const businessId = selected.id;

    this.props.fetchBusinessHours(businessId);
    this.props.fetchBusinessReviews(businessId);
    //this.props.fetchScrape(yelpUrl);

    return (
      <div>
        <Card className="detail-container">
          <BusinessInfo data={businesses} />
          <BusinessMap coords={coords} />
          <div className="clear"></div>
        </Card>
        <Reviews />
      </div>
    )

  }
}

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBusinessReviews, fetchBusinessHours, fetchScrape }, dispatch);
}

function mapStateToProps({ restaurants }) {
  return { restaurants }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetails);