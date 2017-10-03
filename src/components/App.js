import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getlocation } from '../actions/index.js';
import { googleapi } from '../../config.js';
import Header from './Header';

class App extends Component {
  componentDidMount() {
    this.props.getlocation();
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators ({ getlocation }, dispatch)
}


const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*window.addEventListener('load', () => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src  = `https://maps.googleapis.com/maps/api/js?key=${googleapi}&libraries=places`;
  document.body.appendChild(script);
});*/