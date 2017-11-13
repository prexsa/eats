import React from 'react';
import { connect } from 'react-redux';

class Testing extends React.Component {
  render() {
    const { foursquare } = this.props;

    console.log('foursquare: ', foursquare)
    return (
      <div>
        Hello World I'm testing!
      </div>
    )
  }
}

const mapStateToProps = ({ foursquare }) => {
  return { foursquare }
}

export default connect(mapStateToProps)(Testing);