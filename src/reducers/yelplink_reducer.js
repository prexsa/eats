import { FETCH_SCRAPE } from '../actions//types.js';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_SCRAPE:
      return [ action.payload, ...state ];
  }
  return state;
}