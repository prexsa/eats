import { FETCH_BUSINESS_HOURS } from '../actions//types.js';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_BUSINESS_HOURS:
      return [ action.payload, ...state ];
  }
  return state;
}