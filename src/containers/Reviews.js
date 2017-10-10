import React, { Component } from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';

class Reviews extends Component {

  render() {
    const { reviews } = this.props;
    // console.log('reviews: ', reviews)
    if(!reviews[0]) {
      return <div></div>;
    }
    return (
      <div className="review-list-container">
        <h2 className="title">Reviews</h2>
        <List style={{'textAlign': 'left'}}>
          {
            reviews[0].reviews.map(review => {
              return (
                <ListItem
                  key={review.time_created}
                  disabled={true}
                  style={{
                    'borderBottom': '1px solid #ddd', 
                    'paddingBottom': 20, 
                    'marginLeft': 30,
                    'marginRight': 30
                  }}
                >
                  <h4>
                    {review.user.name}
                  </h4>
                  <p style={{'fontSize': 12}}>
                    {review.text}
                  </p>
                </ListItem>
              )
            })
          }
        </List>
      </div>
    )
  }
}

function mapStateToProps({ reviews }) {
  return { reviews }
}

export default connect(mapStateToProps)(Reviews);