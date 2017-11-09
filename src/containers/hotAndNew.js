import React from 'react';
import { connect } from 'react-redux';
import { getHotAndNew } from '../actions/index';

class HotAndNew extends React.Component {
  componentDidMount() {
    //this.props.getHotAndNew();
  }

  render() {
    const { yelp } = this.props;
    return (
      <div>
        <h3>Hot and New</h3>

      </div>
    )
  }
}

const mapStateToProps = ({ yelp }) => {
  return { yelp };
}

export default connect(mapStateToProps, { getHotAndNew })(HotAndNew);
