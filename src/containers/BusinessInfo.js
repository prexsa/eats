import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {indigo500} from 'material-ui/styles/colors';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationLocation from 'material-ui/svg-icons/communication/location-on';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import MapsRateReview from 'material-ui/svg-icons/maps/rate-review';

export default function businessInfo(data) {

  //const businesses = restaurants[0].businesses;
  const selected = data.data[0];
  console.log('selected ', selected)
  const category1 = selected.categories[0][0];
  let category = "";
  selected.categories.forEach(type => {
    category += " " + type.title;
  });
  const name = selected.name;
  const address = selected.location.display_address[0] + " " + selected.location.display_address[1];
  const phone = selected.phone;
  const rating = selected.rating;
  const reviewCount = selected.review_count;
  const yelpUrl = selected.url;
  const businessId = selected.id;

  return (
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
          {/*<ListItem 
            primaryText={<Hours />}
            leftIcon={<ActionSchedule color="#f75c54" />}
            disabled={true}
          />*/}
        </List>
      </CardText>
    </div>
  )
}