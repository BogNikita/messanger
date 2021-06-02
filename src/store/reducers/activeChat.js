import { GET_CHAT, CHANGE_CHAT_STATUS } from '../action/action.type';

const initialState = {
  id: null,
  status: null,
  messages: [],
  operatorId: null,
};

export default function chatList(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT:
      return {
        ...action.chat,
      };
    case CHANGE_CHAT_STATUS:
      return {
        ...state,
        status: action.newStatus,
      };
    default:
      return state;
  }
}
