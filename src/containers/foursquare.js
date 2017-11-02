import React from 'react';
import { connect } from 'react-redux';

class Foursquare extends React.Component {
  render() {
    const { foursquare } = this.props;
    return (
      <div>
        Hello World, I'm Foursqaure
      </div>
    )
  } 
}

const mapStateToProps = ({ foursquare }) => {
  return { foursquare }
}

export default connect(mapStateToProps)(Foursquare);