import React, { Component } from 'react';
import { connect } from 'react-redux';

class Hours extends Component {
  render() {
    const { hours } = this.props;
    if(!hours[0]) {
      return <div></div>;
    }

    // 0 to 6, representing days Mon-Sun
    const hoursArray = hours[0].hours[0].open;
    const date = new Date();

    // numeric value, 0 -> Monday, 6 -> Sunday
    const numeric = date.getDay();
    const currentDay = hoursArray[numeric];
    const start = militaryToStandard(currentDay.start);
    const end = militaryToStandard(currentDay.end);
    const hrOpStr = start + " am - " + end + ' pm';

    return (
      <div>
        {hrOpStr}
      </div>
    )
  }
}

function mapStateToProps({ hours }) {
  return { hours }
}

export default connect(mapStateToProps)(Hours);

function militaryToStandard(str) {
  const firstTwo = str.slice(0,2);
  const convert = (firstTwo < 13) ? firstTwo : firstTwo - 12;
  const timeStr = parseInt(convert) + ":" + str.slice(-2);

  return timeStr;
}
