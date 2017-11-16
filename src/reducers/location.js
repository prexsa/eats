import { GET_LOCATION } from '../actions/types.js';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_LOCATION:
      return { coords: action.payload };
  }
  return state;
}