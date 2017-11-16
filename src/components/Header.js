import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Input } from 'semantic-ui-react';
import SearchBar from '../containers/SearchBar';

class Header extends Component {
  render() {
    return (
      <Menu className="bgcolor7daf74">
        <Menu.Item><h1>Eats</h1></Menu.Item>
        <Menu.Item>
          <SearchBar />
        </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Header);