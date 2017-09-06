import { combineReducers } from 'redux';

import { EXCERPTS } from './actions';


function index(state = null, action) {
  switch (action.type) {
    case EXCERPTS.LOADING:
      return {
        state: 'loading'
      };
    case EXCERPTS.RECEIVE:
      return {
        state: 'loaded',
        items: action.items
      };
    case EXCERPTS.FAILED:
      return {
        state: 'error',
        error: action.error
      };
    case EXCERPTS.UNLOAD:
      return {};
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  index
});


export default rootReducer;
