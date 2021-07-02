import { CLOSE_CHATLIST, OPEN_CHATLIST, CHANGE_PASSWORD } from './action.type';

export function openChatList() {
  return {
    type: OPEN_CHATLIST,
  };
}

export function closeChatList() {
  return {
    type: CLOSE_CHATLIST,
  };
}

export function changePassword(payload) {
  return {
    type: CHANGE_PASSWORD,
    payload
  };
}