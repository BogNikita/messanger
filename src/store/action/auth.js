import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
  AUTH_LOGOUT,
} from './action.type';

export function fetchRequest(email, password) {
  return {
    type: FETCH_AUTH_REQUEST,
    email,
    password,
  };
}

export function fetchSuccess(token, email) {
  return {
    type: FETCH_AUTH_SUCCESS,
    token,
    email
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
