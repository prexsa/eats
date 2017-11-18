import React from 'react';
import { connect } from 'react-redux';
import { foursquareAreaSearch } from '../actions/index';
import { Button, Grid, List, Image, Popup } from 'semantic-ui-react';
import GoogleMap from '../components/GoogleMap';

class BusinessList extends React.Component {
  renderListItems(businesses) {
    //if(Object.getOwnPropertyNames(data).length == 0) return;
    //const businesses = data.yelpHotAndNew.businesses;
    //console.log('businessess: ', businesses)
    return businesses.map(business => {
      //console.log('business: ', business)
      const venue = business.venue;
      let priceCurrency = '',
        priceMessage = '',
        categories = [];

      const id = venue.id;
      const name = venue.name;
      const address = venue.location.address;
      const phone = venue.contact.formattedPhone;
      const checkInCount = venue.stats.checkInCount;
      const rating = venue.rating;
      venue.categories.map(category => {
        categories.push(category.shortName);
      });

      const categoryStr = categories.join(',')

      if(!venue.price) {
        priceCurrency = 'n/a';
        priceMessage = 'n/a';
      } else {
        const tier = venue.price.tier;
        priceMessage = venue.price.message
        priceCurrency;
        for(let i = 0; i < tier; i++) {
          priceCurrency += '$';
        }
      }

      return (
        <List.Item key={id}>
          <List.Content>
            <List.Header>{name}</List.Header>
            <List.Description>Foursquare Rating: {rating} {priceCurrency} - {priceMessage}</List.Description>
            <List.Description>{address}</List.Description>
            <List.Description>{categoryStr}</List.Description>
          </List.Content>
        </List.Item>
      )
    })
  }

  render() {
    const{ foursquare } = this.props;
    if(Object.getOwnPropertyNames(foursquare).length == 0) {
      return <div>Loading Search Results</div>
    }
    const header = foursquare.response.headerFullLocation;
    let groups = foursquare.response.groups;
    const businesses = groups[0].items;
    const region = foursquare.response.suggestedBounds;
    const geocenter = {
     lat: region.ne.lat,
     lng: region.ne.lng
    };

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4} className="list-container">
              <h4><span className="location-header">{header}</span></h4>
              <List divided relaxed>
                { this.renderListItems(businesses) }
              </List>
            </Grid.Column>
            <Grid.Column width={12}>
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

export default connect(mapStateToProps, { foursquareAreaSearch })(BusinessList);
