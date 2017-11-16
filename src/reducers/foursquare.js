import { GET_FOURSQUARES, GET_TRENDING } from '../actions/types.js';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_FOURSQUARES:
      return { ...action.payload };
    case GET_TRENDING:
      return { trending: action.payload };
  }
  return state;
}