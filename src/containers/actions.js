export const ADD_CONFIG = 'ADD_CONFIG';
export const REFRESH_VIEW = 'REFRESH_VIEW';

export function addConfig(config) {
  return {
    type: ADD_CONFIG,
    config
  };
}

export function refreshView(refresh = false) {
  return { type: REFRESH_VIEW, refresh };
}
