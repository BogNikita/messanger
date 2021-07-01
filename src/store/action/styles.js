import { CLOSE_CHATLIST, OPEN_CHATLIST } from './action.type';

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
