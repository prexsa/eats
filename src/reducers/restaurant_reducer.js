import { FETCH_RESTAURANT } from '../actions//types.js';

export default function(state = [], action) {
  switch(action.type) {
    case FETCH_RESTAURANT:
      return [ action.payload, ...state ];
  }
  return state;
}