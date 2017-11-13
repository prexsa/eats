import React from 'react';
import { connect } from 'react-redux';
import { getFoursquares } from '../actions/index';
import { Button, Grid, List, Image } from 'semantic-ui-react';
import GoogleMap from '../components/GoogleMap';

class BusinessList extends React.Component {
  componentDidMount() {
    const geoCoords = {
      lat: 33.7701,
      lng: -118.1937
    }
    this.props.getFoursquares(geoCoords);
  }

  renderListItems(businesses) {
    //if(Object.getOwnPropertyNames(data).length == 0) return;
    //const businesses = data.yelpHotAndNew.businesses;
    //console.log('businessess: ', businesses)
    return businesses.map(business => {
      console.log('business: ', business)
      const venue = business.venue;
      const id = venue.id;
      const name = venue.name;
      const address = venue.location.address;
      const phone = venue.contact.formattedPhone;
      const checkInCount = venue.stats.checkInCount;
      let priceCurrency,
        priceMessage;

      if(!venue.price) {
        priceCurrency = 'n/a';
        priceMessage = 'n/a';
      } else {
        priceCurrency = venue.price.currency;
        priceMessage = venue.price.message
      }

      return (
        <List.Item key={id}>
          <List.Content>
            <List.Header as='a'>{name}, {priceCurrency} - {priceMessage}</List.Header>
            <List.Description>{phone}, {address}</List.Description>
          </List.Content>
        </List.Item>
      )
    })
  }

  render() {
    const{ foursquare } = this.props;
    console.log("foursquare: ", foursquare)
    if(Object.getOwnPropertyNames(foursquare).length == 0) {
      return <div>Loading Search Results</div>
    }
    const header = foursquare.foursquare.response.headerFullLocation;
    let groups = foursquare.foursquare.response.groups;
    const businesses = groups[0].items;
    const region = foursquare.foursquare.response.suggestedBounds;
    const geocenter = {
     lat: region.ne.lat,
     lng: region.ne.lng
    };

    return (
      <div>
      <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <h4>{header}</h4>
              <List divided relaxed className="list-container">
                { this.renderListItems(businesses) }
              </List>
            </Grid.Column>
            <Grid.Column width={10}>
              <GoogleMap list={businesses} geocenter={geocenter} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  } 
}

const mapStateToProps = ({ foursquare }) => {
  return { foursquare }
}

export default connect(mapStateToProps, { getFoursquares })(BusinessList);
