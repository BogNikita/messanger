import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  CHANGE_CHAT_STATUS,
  ADD_NEW_MESSAGE,
} from '../action/action.type';

const initialState = {
  isPending: null,
  isError: null,
  isSuccess: null,
  errorMessage: null,
  chatList: {
    active: { hasMore: false, chats: [] },
    offline: { hasMore: false, chats: [] },
    save: { hasMore: false, chats: [] },
    waiting: { hasMore: false, chats: [] },
  },
};

export default function chatList(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHAT_REQUEST:
      return {
        ...state,
        isPending: true,
        isError: null,
      };
    case FETCH_CHAT_SUCCESS:
      return {
        ...state,
        chatList: {
          ...state.chatList,
          [action.status]: {
            hasMore: action.hasMore,
            chats: [...action.data],
          },
        },
        isPending: false,
        isSuccess: true,
      };
    case FETCH_CHAT_FAILURE:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: action.error,
      };
    case CHANGE_CHAT_STATUS:
      const newState = JSON.parse(JSON.stringify(state.chatList));
      const find = newState[action.oldStatus].chats.find((chat) => chat.id === action.id);
      newState[action.oldStatus].chats = newState[action.oldStatus].chats.filter(
        (chat) => chat.id !== find.id,
      );
      newState[action.newStatus].chats.push(find);
      return {
        ...state,
        chatList: { ...newState },
      };
    case ADD_NEW_MESSAGE:
      const newStateActive = JSON.parse(JSON.stringify(state.chatList.active.chats));
      const findChat = newStateActive.find((chat) => chat.id === action.id);
      findChat.messages.push(action.newMessage);
      return {
        ...state,
        chatList: {
          ...state.chatList,
          active: {
            chats: [...newStateActive],
          },
        },
      };
    default:
      return state;
  }
}
