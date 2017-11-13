import { YELP_BUSINESS_DETAILS } from '../actions/types.js';

export default function(state = {}, action) {
  switch(action.type) {
    case YELP_BUSINESS_DETAILS: 
      return { businessDetails: action.payload };
  }
  return state;
}