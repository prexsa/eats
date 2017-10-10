import { FETCH_BUSINESS_REVIEWS } from '../actions//types.js';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_BUSINESS_REVIEWS:
      return [ action.payload, ...state ];
  }
  return state;
}