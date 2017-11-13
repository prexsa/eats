import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, List, Image, Tab } from 'semantic-ui-react';
import TabsPhoto from './Tabs.Photo';

class BusinessDetails extends React.Component {  
  render() {
    const testing = {test: "Testing string"};
    const testing2 = "Another testing String";
    const panes = [
      { menuItem: 'Tab 1', render: (test) => <Tab.Pane attached={false}><TabsPhoto /></Tab.Pane> },
      { menuItem: 'Tab 2', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
      { menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> },
    ]
    return (
      <div className="details-container">
        <List>
          <List.Item>
            <List.Content>
              <List.Header className="color7daf74"><h2>Name of Restaurant</h2></List.Header>
              <List.Description>Type of Restaurant, Price</List.Description>
              <List.Description>Ratings - foursquare/yelp</List.Description>
            </List.Content>
          </List.Item>
        </List>
        <Tab menu={{ pointing: true }} panes={panes} testing={testing} />
        <p>Address of Restaurant</p>
        --map, --menu, --photos, --reviews, --foursquare/yelp rating
      </div>
    )
  }
}

export default BusinessDetails;