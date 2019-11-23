import { combineReducers } from 'redux';

import { ADD_CONFIG, REFRESH_VIEW } from './actions';

function config(state = { widgets: [], refresh: false }, action) {
  switch (action.type) {
    case ADD_CONFIG:
      return { ...state, ...action.config };

    case REFRESH_VIEW:
      return { ...state, refresh: action.refresh };

    default:
      return state;
  }
}

const hakboard = combineReducers({
  config
});

export default hakboard;
