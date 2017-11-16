import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, List, Image } from 'semantic-ui-react';

class Testing extends React.Component {

  renderListFoursquare(businesses) {
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
            <List.Header>{name}, {priceCurrency} - {priceMessage}</List.Header>
            <List.Description>{address}, {phone}</List.Description>
            <List.Description>{categoryStr}, Foursquare Rating: {rating}</List.Description>
          </List.Content>
        </List.Item>
      )
    })
  }

  renderListYelp(businesses) {
    //if(Object.getOwnPropertyNames(data).length == 0) return;
    //const businesses = data.yelpHotAndNew.businesses;
    //console.log('businessess: ', businesses)
    return businesses.map(business => {
      const id = business.id;
      const name = business.name;
      const image = business.image_url;
      const address = business.location.display_address[0];
      const phone = business.display_phone;
      const price = business.price;
      let categories = [];
      business.categories.map(i => {
        categories.push(i.title);
      });
      const categoryStr = categories.join(', ')

      return (
        <List.Item key={id}>
          <Image avatar src={image} />
          <List.Content>
            <List.Header>{name}, {price}</List.Header>
            <List.Description>{phone}, {address}</List.Description>
            <List.Description>{categoryStr}</List.Description>
          </List.Content>
        </List.Item>
      )
    })
  }

  render() {
    const { foursquare, yelp } = this.props;

    console.log('foursquare: ', foursquare)
    console.log('yelp: ', yelp)
    if(Object.getOwnPropertyNames(yelp).length == 0) {
      return <div>Loading Search Results</div>
    }
    if(Object.getOwnPropertyNames(foursquare).length == 0) {
      return <div>Loading Search Results</div>
    }
    const yelps = yelp.areaSearchYelp.businesses;
    let groups = foursquare.response.groups;
    const four = groups[0].items;

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <h4>Foursquare</h4>
              <List divided relaxed className="list-container">
                { this.renderListFoursquare(four) }
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <h4>Yelp</h4>
              <List divided relaxed className="list-container">
                { this.renderListYelp(yelps) }
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ foursquare, yelp }) => {
  return { foursquare, yelp }
}

export default connect(mapStateToProps)(Testing);