import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, List, Image, Label } from 'semantic-ui-react';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

class TransactionList extends React.Component {
  scrapeYelp(url) {
    //console.log('url', url);
  }

  renderListItems(businesses) {
    return businesses.map(business => {
      //console.log(business)
      const id = business.id;
      const name = business.name;
      const rating = business.rating;
      const image = business.image_url;
      const url = business.url;
      const address = business.location.display_address[0];
      const phone = business.display_phone;
      const price = business.price;
      let transactions = [];
      business.transactions.map((type) => {
        const each = type.split('_');
        const lastElement = each.slice(-1)[0].capitalize();
        transactions.push(lastElement);
      });

      let categories = [];
      business.categories.map(i => {
        categories.push(i.title);
      });
      const categoryStr = categories.join(', ');

      return (
        <List.Item key={id}>
          <List.Content floated='right' className='transactions'>
            <List>
              {
                transactions.map(type => {
                  return (
                    <List.Item key={type}>{type}</List.Item>
                  )
                })
              }
            </List>
          </List.Content>
          <List.Content floated='left' className='yelp-rating rating-circle'>
            {rating}
          </List.Content>
          <List.Content>
            <List.Header>{name}, {price}</List.Header>
            <List.Description>{phone}, {address}</List.Description>
            <List.Description href={url} target='_blank'>{categoryStr}</List.Description>
          </List.Content>
        </List.Item>
      )
    })
  }

  render() {
    const { yelp } = this.props;
    //console.log('Yelp: ', yelp)
    if(Object.getOwnPropertyNames(yelp).length == 0) {
      return <div>Loading Search Results</div>
    }
    const businesses = yelp.transactions.businesses;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column className="list-container">
            <List divided relaxed>
              { this.renderListItems(businesses) }
            </List>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = ({ yelp }) => {
  return { yelp }
}

export default connect(mapStateToProps)(TransactionList);