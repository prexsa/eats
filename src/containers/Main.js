import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getlocation, fetchGeolocationArea } from '../actions/index';
import ExploreArea from '../containers/ExploreArea';
import GoogleMaps from '../components/GoogleMap';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      businessArray: [],
      latCoords: null,
      lngCoords: null
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { businessArray, latCoords, lngCoords } = this.state;
    const latProps = nextProps.location.coords.latitude;
    const lngProps = nextProps.location.coords.longitude;

    if(this.props.geolocation != nextProps.geolocation) {
      this.setState({ businessArray: nextProps.geolocation });
    }

    if((this.state.latCoords === null && this.state.lngCoords === null) || 
      (this.state.latCoords !== latProps && this.state.lngCoords !== lngProps)) {
      this.setState({ latCoords: latProps, lngCoords: lngProps});
      const coords = {
        lat: latProps,
        lng: lngProps
      }
      this.props.fetchGeolocationArea(coords);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { businessArray } = this.state;
    return businessArray != nextProps.geolocation;
  }

  render() {
    const { businessArray } = this.state;
    if(businessArray.length === []) {
      return <div>No Geolocation</div>
    }
    const businessList = businessArray.businesses;
    const centerCoords = {
      lat: this.state.latCoords || 33.8537859,
      lng: this.state.lngCoords || -118.17661799999999
    }
    return (
      <div>
        <h2 className="title">In Your Area</h2>
        <GoogleMaps list={businessList} geocenter={centerCoords} />
        <ExploreArea />
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchGeolocationArea, getlocation }, dispatch)
}

function mapStateToProps({ location, geolocation }) {
  return { location, geolocation };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
