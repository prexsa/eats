import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getlocation, fetchGeolocationArea } from '../actions/index';
//import { googleapi } from '../../config';
import { Link } from 'react-router';
/*import Header from './Header';*/
import SearchBar from '../containers/SearchBar';

class App extends Component {
  componentDidMount() {
    this.props.getlocation();
  }

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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getlocation, fetchGeolocationArea }, dispatch)
}

const mapStateToProps = ({ auth }) => {
  return { auth };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);