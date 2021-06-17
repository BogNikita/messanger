import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  CHAT_TYPING,
  FETCH_CHANGE_CHAT_STATUS,
  CHANGE_CHAT_STATUS,
  FETCH_ADD_NEW_MESSAGE,
  ADD_NEW_MESSAGE
} from './action.type';

export function fetchChatRequest(count, status) {
  return {
    type: FETCH_CHAT_REQUEST,
    count,
    status,
  };
}

export function fetchChatSuccess(data, status, hasMore) {
  return {
    type: FETCH_CHAT_SUCCESS,
    data,
    status,
    hasMore,
  };
}

export function fetchChatError(error) {
  return {
    type: FETCH_CHAT_FAILURE,
    error,
  };
}

export function chatTyping(id, value) {
  return {
    type: CHAT_TYPING,
    id,
    value,
  };
}

export function fetchChangeChatStatus(id, oldStatus, newStatus, email) {
  return {
    type: FETCH_CHANGE_CHAT_STATUS,
    newStatus,
    oldStatus,
    id,
    email,
  };
}

export function changeChatStatus(id, newStatus, email, oldStatus) {
  return {
    type: CHANGE_CHAT_STATUS,
    newStatus,
    id,
    email,
    oldStatus,
  };
}

export function fetchAddNewMessage(id, newMessage, index) {
  return {
    type: FETCH_ADD_NEW_MESSAGE,
    id,
    newMessage,
    index
  };
}

export function addNewMessage(id, newMessage) {
  return {
    type: ADD_NEW_MESSAGE,
    id,
    newMessage
  }
}