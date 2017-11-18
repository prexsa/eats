import React from 'react';
import { connect } from 'react-redux';
import { Button, Grid, List, Image } from 'semantic-ui-react';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

class TransactionList extends React.Component {
  renderListItems(businesses) {
    return businesses.map(business => {
      const id = business.id;
      const name = business.name;
      const image = business.image_url;
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
    const { yelp } = this.props;
    console.log('Yelp: ', yelp)
    if(Object.getOwnPropertyNames(yelp).length == 0) {
      return <div>Loading Search Results</div>
    }
    const businesses = yelp.businesses;

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