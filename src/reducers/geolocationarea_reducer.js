import { FETCH_GEOLOCATION_AREA } from '../actions/types.js'

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_GEOLOCATION_AREA:
      return [ action.payload, ...state ];
  }
  return state;
}