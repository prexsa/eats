import React from 'react';
import { connect } from 'react-redux';

class Trending extends React.Component {
  render() {
    return (
      <div>Hello World, I'm Trending</div>
    )
  }
}

const mapStateToProps = ({ foursquare }) => {
  return { foursquare }
}

export default connect(mapStateToProps)(Trending);