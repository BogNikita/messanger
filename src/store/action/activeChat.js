import { GET_CHAT, FETCH_CHANGE_CHAT_STATUS, CHANGE_CHAT_STATUS } from './action.type';

export function getChat(chat) {
  return {
    type: GET_CHAT,
    chat,
  };
}

export function fetchChangeChatStatus(id, status, email) {
  return {
    type: FETCH_CHANGE_CHAT_STATUS,
    status,
    id,
    email
  };
}

export function changeChatStatus(id, status, email) {
  return {
    type: CHANGE_CHAT_STATUS,
    status,
    id,
    email
  };
}
