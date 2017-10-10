import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBusinessHours, fetchBusinessReviews, fetchScrape } from '../actions/index.js'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {indigo500} from 'material-ui/styles/colors';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationLocation from 'material-ui/svg-icons/communication/location-on';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import MapsRateReview from 'material-ui/svg-icons/maps/rate-review';
import Hours from '../containers/Hours';
import Reviews from '../containers/Reviews';

const mapStyle = {
  width: 580,
  height: 580
};

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    }
  }
  componentDidMount() {
    if(this.props.restaurants.length <= 0) {
      return <div>Testing map</div>;
    }
    const data = this.props.restaurants[0].businesses;
    const lat = data[0].coordinates.latitude;
    const lng = data[0].coordinates.longitude;
    
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
  
  componentWillUpdate() {
    if(this.props.restaurants.length <= 0) {
      return <div>Testing map</div>;
    }
    const data = this.props.restaurants[0].businesses;
    const lat = data[0].coordinates.latitude;
    const lng = data[0].coordinates.longitude;
    
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

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('nextProps: ', nextProps.restaurants[0])
    const restaurantList = nextProps.restaurants[0].businesses;
    const value = randomInt(0, 19);
    const chosen = restaurantList[value];
    //console.log('chosenL ', chosen)
    this.setState({ selected: chosen });
    return true;
  }

  render() {
    console.log('this.state: ', this.state)
    const { restaurants } = this.props;
    if(!restaurants[0]) {
      return <div></div>;
    }
    //console.log('business: ', restaurants[0].businesses);
    const businesses = restaurants[0].businesses;
    const selected = businesses[0];
    const category1 = selected.categories[0][0];
    let category = "";
    selected.categories.forEach(type => {
      category += " " + type.title;
    });
    const name = selected.name;
    const address = selected.location.display_address[0] + " " + selected.location.display_address[1];
    const phone = selected.phone;
    const rating = selected.rating;
    // const yelpRatingImg = selected.rating_img_url;
    const reviewCount = selected.review_count;
    const yelpUrl = selected.url;
    const businessId = selected.id;

    this.props.fetchBusinessHours(businessId);
    this.props.fetchBusinessReviews(businessId);
    //this.props.fetchScrape(yelpUrl);

    return (
      <div>
        <Card className="detail-container">
          <div className="restaurant-detail">
            <a href={yelpUrl} target="_blank">
              <CardHeader 
                title={name} 
                style={{'left': 20}} 
                titleStyle={{'fontSize': 24, 'textAlign': 'left', 'paddingRight': 0}}
              />
            </a>
            <CardText>
              <List  className="details">
                <ListItem 
                  primaryText={category}
                  disabled={true}
                />
                <ListItem 
                  primaryText={phone} 
                  leftIcon={<CommunicationCall color={indigo500} />} 
                  disabled={true}
                />
                <ListItem 
                  primaryText={address} 
                  leftIcon={<CommunicationLocation color="#f75c54" />}
                  disabled={true} 
                />
                <ListItem  hoverColor='#fff' leftIcon={<MapsRateReview color="#f75c54" />}>
                  <span>
                    <svg width="60" height="25">
                      <text x="0" y="20" stroke="#f77a52" fontSize="16"> {rating} / 5 </text>
                    </svg>
                  </span>
                  <span>
                    <svg width="160" height="25">
                      <text x="0" y="20" stroke="#f77a52" fontSize="16"> ({reviewCount} Reviews) </text>
                    </svg>
                  </span>
                </ListItem>
                <ListItem 
                  primaryText={<Hours />}
                  leftIcon={<ActionSchedule color="#f75c54" />}
                  disabled={true}
                />
              </List>
            </CardText>
          </div>
          <div className="map-container" ref="map" style={mapStyle}>
            Maps
          </div>
          <div className="clear"></div>
        </Card>
        <Reviews />
      </div>
    )

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchBusinessReviews, fetchBusinessHours, fetchScrape }, dispatch);
}

function mapStateToProps({ restaurants }) {
  return { restaurants }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetails);