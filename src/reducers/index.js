import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import geolocationAreaReducer from './geolocationarea_reducer';
import getLocationReducer from './getlocation_reducer';
import reviewsReducer from './reviews_reducer';
import hoursReducer from './hours_reducer';
import yelpLinkReducer from './yelplink_reducer';
import restaurantReducer from './restaurant_reducer';
import foursquare from './foursquare';
import yelp from './yelp';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  geolocation: geolocationAreaReducer,
  location: getLocationReducer,
  restaurants: restaurantReducer,
  reviews: reviewsReducer,
  hours: hoursReducer,
  yelp1: yelpLinkReducer,
  foursquare,
  yelp
});

export default rootReducer;