import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
} from './action.type';

export function fetchChatRequest(count, status) {
  return {
    type: FETCH_CHAT_REQUEST,
    count,
    status
  };
}

export function fetchChatSuccess(data, status, hasMore) {
  return {
    type: FETCH_CHAT_SUCCESS,
    data,
    status,
    hasMore
  };
}

export function fetchChatError(error) {
  return {
    type: FETCH_CHAT_FAILURE,
    error,
  };
}

