import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, List, Image, Tab } from 'semantic-ui-react';

class BusinessDetails extends React.Component {
  render() {
    return (
      <div className="details-container">
        <List>
          <List.Item>
            <List.Content>
              <List.Header><h2>Name of Restaurant</h2></List.Header>
              <List.Description>Type of Restaurant, Price</List.Description>
              <List.Description>Ratings - foursquare/yelp</List.Description>
            </List.Content>
          </List.Item>
        </List>
        <div>
          <h3>Photos</h3>
        </div>
        <p>Address of Restaurant</p>
        --map, --menu, --photos, --reviews, --foursquare/yelp rating
      </div>
    )
  }
}

export default BusinessDetails;