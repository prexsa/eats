import React, { Component } from 'react';
import { connect } from 'react-redux';
import { googleapi } from '../../config';
import { Link } from 'react-router';
import Header from './Header';
import SearchBar from '../containers/searchBar';

class App extends Component {
  render() {
    return (
      <div>
        {/*<Header />*/}
        <div className="header-container">
          <Link to="/"><h1>Eats</h1></Link>
        </div>
        <p className="phrase">
          Can't Decide, Enter A Seach Location...
        </p>
        <SearchBar />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps)(App);

/*window.addEventListener('load', () => {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src  = `https://maps.googleapis.com/maps/api/js?key=${googleapi}&libraries=places`;
  document.body.appendChild(script);
});*/