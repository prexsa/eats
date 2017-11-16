import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import geolocationAreaReducer from './geolocationarea_reducer';
import reviewsReducer from './reviews_reducer';
import hoursReducer from './hours_reducer';
import yelpLinkReducer from './yelplink_reducer';
import restaurantReducer from './restaurant_reducer';

import location from './location';
import foursquare from './foursquare';
import yelp from './yelp';
import businessDetails from './businessDetailsReducer.yelp';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  geolocation: geolocationAreaReducer,
  location,
  restaurants: restaurantReducer,
  reviews: reviewsReducer,
  hours: hoursReducer,
  yelp1: yelpLinkReducer,
  businessDetails,
  foursquare,
  yelp
});

export default rootReducer;