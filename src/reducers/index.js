import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import geolocationAreaReducer from './geolocationarea_reducer.js';
import getLocationReducer from './getlocation_reducer.js';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  geolocation: geolocationAreaReducer,
  location: getLocationReducer
});

export default rootReducer;