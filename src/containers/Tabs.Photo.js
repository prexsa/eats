import React from 'react';
import { connect } from 'react-redux';
import { yelpBusinessDetails } from '../actions/index';
import { Button, Grid, List, Menu, Image, Tab } from 'semantic-ui-react';
import Slider from 'react-slick';

const src = '../../public/novitec.jpg';
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

class TabsPhoto extends React.Component {
  componentDidMount() {
    this.props.yelpBusinessDetails("big-catch-seafood-house-long-beach");
  }
  render() {
    const { yelp } = this.props;

    console.log('yelp: ', yelp)
    return (
      <div>
        <h3>Photos</h3>
        <Slider {...settings}> 
          <div>
            <Image.Group size='medium'>
              <Image src={src} />
              <Image src={src} />
              <Image src={src} />
              <Image src={src} />
              <Image src={src} />
              <Image src={src} />
              <Image src={src} />
              <Image src={src} />
            </Image.Group>
          </div>
          <div><Image src={src} /></div>
          <div><Image src={src} /></div>
          <div><Image src={src} /></div>
          <div><Image src={src} /></div>
        </Slider>
      </div>
    )
  }
}

const mapStateToProps = ({ yelp }) => {
  return { yelp }
}

export default connect(mapStateToProps, { yelpBusinessDetails })(TabsPhoto);