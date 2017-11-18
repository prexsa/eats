import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

class Favorites extends React.Component {
  addToLocalStorage() {
    console.log('addToLocalStorage: ')
    const testing = { yea: 'Man' };
    const str = JSON.stringify(testing)
    localStorage.setItem('testing', str)
    const back = localStorage.getItem('testing')
    const parsed = back.toString()
    console.log('back: ', parsed)

  }
  render() {
    return (
      <Button icon onClick={() => this.addToLocalStorage()}>
        <Icon name='home' size='large' />
      </Button>
    )
  }
}

export default Favorites;
