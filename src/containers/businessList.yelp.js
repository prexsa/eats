import React from 'react';
import { connect } from 'react-redux';
import { yelpAreaSearch } from '../actions/index';
import Slider from 'react-slick';
import { Button, Grid, List, Image } from 'semantic-ui-react';
import GoogleMap from '../components/GoogleMap';

// http://jsfiddle.net/paulalexandru/T2F5Z/

class BusinessList extends React.Component {
  componentDidMount() {
    const geoCoords = {
      lat: 33.7701,
      lng: -118.1937
    }
    this.props.yelpAreaSearch(geoCoords);
  }

  renderListItems(businesses) {
    //console.log("data: ", data)
    //if(Object.getOwnPropertyNames(data).length == 0) return;
    //const businesses = data.yelpHotAndNew.businesses;
    // console.log('businessess: ', businesses)
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
            <List.Header as='a'>{name}, {price}</List.Header>
            <List.Description>{phone}, {address}</List.Description>
            <List.Description>{categoryStr}</List.Description>
          </List.Content>
        </List.Item>
      )
    })
  }

  render() {
    const{ yelp } = this.props;
    // console.log("yelp: ", yelp)
    if(Object.getOwnPropertyNames(yelp).length == 0) {
      return <div>Loading Search Results</div>
    }
    const businesses = yelp.areaSearchYelp.businesses;
    const region = yelp.areaSearchYelp.region;
    const geocenter = {
     lat: region.center.latitude,
     lng: region.center.longitude
    };

    return (
      <div>
      <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
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

const mapStateToProps = ({ yelp }) => {
  return { yelp }
}

export default connect(mapStateToProps, { yelpAreaSearch })(BusinessList);
