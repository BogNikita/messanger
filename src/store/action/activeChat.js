import { GET_CHAT, FETCH_CHANGE_CHAT_STATUS, CHANGE_CHAT_STATUS } from './action.type';

export function getChat(chat) {
  return {
    type: GET_CHAT,
    chat,
  };
}

export function fetchChangeChatStatus(id, status, email) {
  let newStatus;
  if (status === 'offline') {
    newStatus = 'save';
  } else if (status === 'save') {
    newStatus = 'offline';
  } else {
    newStatus = 'active';
  }
  return {
    type: FETCH_CHANGE_CHAT_STATUS,
    newStatus,
    oldStatus: status,
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
    oldStatus
  };
}
