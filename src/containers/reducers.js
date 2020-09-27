import { ADD_CONFIG, REFRESH_VIEW, SET_EDIT_MODE, SET_MODAL } from './actions';

function config(state = { config: { widgets: [] }, refresh: false, editMode: false }, action) {
  switch (action.type) {
    case ADD_CONFIG:
      return { ...state, config: action.config };

    case SET_EDIT_MODE:
      return { ...state, editMode: action.editMode };

    case REFRESH_VIEW:
      return { ...state, refresh: action.refresh };

    case SET_MODAL:
      return { ...state, modal: action.modal };

    default:
      return state;
  }
}

export default config;
