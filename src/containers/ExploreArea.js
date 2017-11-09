import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
// https://www.tripadvisor.com/Restaurants-g32648-Long_Beach_California.html

const style = {
  item: {
    borderBottom: "1px solid gray",
    height: 200
  },
  rbg: {
    display: "flex",
    flexDirection: "row",
    width: 600
  }
}

class Area extends Component {
  render() {
    const { geolocation } = this.props;
    if(!geolocation.businesses) {
      return <div>No Data From Geolocation</div>;
    }

    const businesses = geolocation.businesses;
    
    return (
      <div className="area-container">
        <List>
          {
            businesses.map(business => {
              const yelpUrl = business.url;
              const img = business.image_url;
              const name = business.name;
              const price = business.price;
              const reviewCount = business.review_count;
              const categories = business.categories;
              const contact = business.display_phone;
              let rating = business.rating;

              let titles = [];
              categories.forEach(title => {
                titles.push(title.title);
              });

              const categoryTitles = titles.join(', ');

              return (
                <ListItem key={name} disabled={true} style={style.item}>
                  <img className="yelp-img" src={img} alt="image" />
                  <div className="overview">
                    <ul>
                      <li><a href={yelpUrl} target="_blank"><h4>{name}</h4></a></li>
                      <li>
                        <span style={{"position": "relative", "top": 5}}>
                          <svg width="60" height="25">
                            <text x="0" y="20" stroke="#f77a52" fontSize="14"> {rating} / 5 </text>
                          </svg>
                        </span>
                        <span>
                          ({reviewCount} Reviews)
                        </span>
                      </li>
                      <li>Price: {price}</li>
                      <li>{categoryTitles}</li>
                      <li>{contact}</li>
                    </ul>
                  </div>
                </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }
}

function mapStateToProps({ geolocation }) {
  return { geolocation }
}

export default connect(mapStateToProps)(Area);

// https://codepen.io/xgad/post/svg-radial-progress-meters