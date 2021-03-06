import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Input, Button, Icon } from 'semantic-ui-react';
import SearchBar from '../containers/SearchBar';

class Header extends Component {
  render() {
    return (
      <Menu className="bgcolor7daf74">
        <Menu.Item><h1>Eats</h1></Menu.Item>
        <Menu.Item className="searchbar-menu-item">
          <SearchBar />
        </Menu.Item>
        <Menu.Item>
          <Button onClick={() => console.log("My Location Button")}>
            <Icon name='map pin' size='large' />My Location
          </Button>
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Header);