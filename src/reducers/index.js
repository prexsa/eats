import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import location from './location';
import foursquare from './foursquare';
import yelp from './yelp';
import businessDetails from './businessDetailsReducer.yelp';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  location,
  businessDetails,
  foursquare,
  yelp
});

export default rootReducer;