import { FOURSQUARES_AREA_SEARCH, GET_TRENDING } from '../actions/types.js';

export default function(state = {}, action) {
  switch(action.type) {
    case FOURSQUARES_AREA_SEARCH:
      return { ...action.payload };
    case GET_TRENDING:
      return { trending: action.payload };
  }
  return state;
}