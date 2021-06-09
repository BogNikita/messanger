import { GET_CHAT, CHANGE_CHAT_STATUS, ADD_NEW_MESSAGE, CHAT_TYPING } from '../action/action.type';

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
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    case CHAT_TYPING:
      if (action.id === state.id) {
        return {
          ...state,
          isTyping: action.value,
        };
      } else {
        return state;
      }

    default:
      return state;
  }
}
