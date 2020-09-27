export const ADD_CONFIG = 'ADD_CONFIG';
export const REFRESH_VIEW = 'REFRESH_VIEW';
export const SET_EDIT_MODE = 'SET_EDIT_MODE';
export const SET_MODAL = 'SET_MODAL';

export function addConfig(config) {
  return {
    type: ADD_CONFIG,
    config,
  };
}

export function setEditMode(editMode) {
  return { type: SET_EDIT_MODE, editMode };
}

export function refreshView(refresh = false) {
  return { type: REFRESH_VIEW, refresh };
}

export function setModal(type, entity) {
  return { type: SET_MODAL, modal: { type, widget: entity } };
}
