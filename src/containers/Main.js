import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGeolocationArea } from '../actions/index.js';
import SearchBar from '../containers/searchBar.js';
import ExploreArea from '../containers/ExploreArea.js';


class Main extends Component {
  render() {
    const { location } = this.props;
    
    if(!location[0]) {
        return <div></div>
      }
      const lat = location[0].coords.latitude;
      const lng = location[0].coords.longitude;

      const coords = { lat, lng };

      this.props.fetchGeolocationArea(coords);

    return (
      <div>
        <div className="bg">
          <div className="app-search-container">
            <p>Can't Decide On What To Eat, Let Us Pick For You</p>
            <SearchBar />
          </div>
        </div>
        <ExploreArea />
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGeolocationArea }, dispatch)
}

function mapStateToProps({ location }) {
  return { location };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
