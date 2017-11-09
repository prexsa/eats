import { GET_HOT_AND_NEW } from '../actions/types.js';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_HOT_AND_NEW:
      return { yelpHotAndNew : action.payload };
  }
  return state;
}