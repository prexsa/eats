import { YELP_AREA_SEARCH } from '../actions/types.js';

export default function(state = {}, action) {
  switch(action.type) {
    case YELP_AREA_SEARCH:
      return { areaSearchYelp : action.payload };
  }
  return state;
}