import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGeolocationArea } from '../actions/index';
import ExploreArea from '../containers/ExploreArea';
import GoogleMaps from '../components/GoogleMap';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      geolocation: []
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const location = nextProps.location;
    const geolocation = nextProps.geolocation;

    if(this.state.geolocation.length < 1) {
      
      this.setState({ geolocation });
      if(!location[0]) {
        return <div></div>
      }

      const lat = location[0].coords.latitude;
      const lng = location[0].coords.longitude;

      const coords = { lat, lng };

      this.props.fetchGeolocationArea(coords);
      return true;
    }
    return false;
  }

  render() {
    if(this.state.geolocation.length < 0) {
      return <div>No Geolocation</div>
    }
    const businessList = this.state.geolocation[0];
    return (
      <div>
        <h2 className="title">In Your Area</h2>
        <GoogleMaps list={businessList} />
        <ExploreArea />
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGeolocationArea }, dispatch)
}

function mapStateToProps({ location, geolocation }) {
  return { location, geolocation };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
