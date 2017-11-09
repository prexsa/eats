import React from 'react';
import { connect } from 'react-redux';
import { getHotAndNew } from '../actions/index';
import Slider from 'react-slick';
/*import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';*/
import { Button, List, Image } from 'semantic-ui-react';

class Foursquare extends React.Component {
  componentDidMount() {
    this.props.getHotAndNew();
  }

  renderListItems(data) {
    console.log("data: ", data)
    if(Object.getOwnPropertyNames(data).length == 0) return;
    const businesses = data.yelpHotAndNew.businesses;
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

    //console.log('yelp :', yelp)
    if(!yelp) {
      return <div>Loading Search Results</div>
    }
    return (
      <div>
        <h3></h3>  
        <List divided relaxed className="list-container">
          { this.renderListItems(yelp) }
        </List>
      </div>
    )
  } 
}

const mapStateToProps = ({ yelp }) => {
  return { yelp }
}

export default connect(mapStateToProps, { getHotAndNew })(Foursquare);
