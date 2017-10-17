import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';

class Header extends Component {
  renderLinks() {
    if(this.props.authenticated) {
      return <FlatButton><Link to="/Signout">Sign Out</Link></FlatButton>
    }else{
      return <FlatButton><Link to="/Login">Login</Link></FlatButton>
    }
  }

  render() {
    return (
      <AppBar>
        { this.renderLinks() }
      </AppBar>
    )
  }
}

const mapStateToProps = (state) => {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(Header);