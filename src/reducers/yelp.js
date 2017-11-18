import { YELP_AREA_SEARCH, YELP_TRANSACTION_TYPE } from '../actions/types.js';

export default function(state = {}, action) {
  switch(action.type) {
    case YELP_AREA_SEARCH:
      return { areaSearchYelp : action.payload };
    case YELP_TRANSACTION_TYPE:
      return { ...action.payload };
  }
  return state;
}