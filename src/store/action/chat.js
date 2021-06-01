import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
} from './action.type';

export function fetchChatRequest() {
  return {
    type: FETCH_CHAT_REQUEST,
  };
}

export function fetchChatSuccess(data) {
  return {
    type: FETCH_CHAT_SUCCESS,
    data,
  };
}

export function fetchChatError(error) {
  return {
    type: FETCH_CHAT_FAILURE,
    error,
  };
}

