import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from './action.type';

export function fetchRequest(email, password) {
  return {
    type: FETCH_MESSAGES_REQUEST,
    email,
    password
  };
}

export function fetchSuccess() {
  return {
    type: FETCH_MESSAGES_SUCCESS,
  };
}

export function fetchError(error) {
  return {
    type: FETCH_MESSAGES_FAILURE,
    error,
  };
}
