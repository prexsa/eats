import { GET_FOURSQUARES } from '../actions/types.js';

export default function(state = [], action) {
  console.log('action: ', action.payload)
  switch(action.type) {
    case GET_FOURSQUARES:
      return [ action.payload, ...state ];
  }
  return state;
}