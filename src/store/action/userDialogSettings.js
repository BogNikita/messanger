import {
  FETCH_USER_DIALOG_SETTINGS_REQUEST,
  FETCH_USER_DIALOG_SETTINGS_SUCCESS,
  FETCH_USER_DIALOG_SETTINGS_FAILURE,
  FETCH_UPDATE_USER_DIALOG_SETTINGS,
  UPDATE_USER_DIALOG_SETTINGS
} from './action.type';

export function fetchUserDialogSettingsRequest(token) {
  return {
    type: FETCH_USER_DIALOG_SETTINGS_REQUEST,
    token,
  };
}

export function fetchUserDialogSettingsSuccess(messages, autoGreeting) {
  return {
    type: FETCH_USER_DIALOG_SETTINGS_SUCCESS,
    messages,
    autoGreeting,
  };
}

export function fetchUserDialogSettingsError(error) {
  return {
    type: FETCH_USER_DIALOG_SETTINGS_FAILURE,
    error,
  };
}

export function fetchUserDialogSettingsUpdate(token, messages, autoGreeting) {
  return {
    type: FETCH_UPDATE_USER_DIALOG_SETTINGS,
    token,
    messages,
    autoGreeting,
  };
}

export function updateUserDialogSettings(messages, autoGreeting) {
  return {
    type: UPDATE_USER_DIALOG_SETTINGS,
    messages,
    autoGreeting,
  };
}


