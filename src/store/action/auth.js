import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
  AUTH_LOGOUT,
  FETCH_CHANGE_AVATAR,
  CHANGE_AVATAR,
  UPDATE_PROFILE,
  FETCH_UPDATE_PROFILE,
  FETCH_AUTH_SIGNUP,
  FETCH_GOOGLE_AUTH,
  FETCH_GITHUB_AUTH,
  CLEAR_ERROR,
} from './action.type';

export function fetchRequest(email, password) {
  return {
    type: FETCH_AUTH_REQUEST,
    email,
    password,
  };
}

export function fetchSuccess(user) {
  return {
    type: FETCH_AUTH_SUCCESS,
    user,
  };
}

export function fetchError(error) {
  return {
    type: FETCH_AUTH_FAILURE,
    error,
  };
}

export function logout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function fetchChangeAvatar(photoURL) {
  return {
    type: FETCH_CHANGE_AVATAR,
    photoURL,
  };
}

export function changeAvatar(photoURL) {
  return {
    type: CHANGE_AVATAR,
    photoURL,
  };
}

export function updateProfile(displayName, photoURL) {
  return {
    type: UPDATE_PROFILE,
    displayName,
    photoURL,
  };
}

export function fetchUpdateProfile(displayName, photo, password) {
  return {
    type: FETCH_UPDATE_PROFILE,
    displayName,
    photo,
    password,
  };
}

export function fetchSignup(email, password) {
  return {
    type: FETCH_AUTH_SIGNUP,
    email,
    password,
  };
}

export function fetchGoogleAuth() {
  return {
    type: FETCH_GOOGLE_AUTH,
  };
}

export function fetchGithubAuth() {
  return {
    type: FETCH_GITHUB_AUTH,
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  };
}
