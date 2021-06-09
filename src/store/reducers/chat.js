import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  CHANGE_CHAT_STATUS,
  ADD_NEW_MESSAGE,
  CHAT_TYPING,
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
      const findChatIndex = newStateActive.findIndex((chat) => chat.id === action.id);
      newStateActive[findChatIndex].messages = [
        ...newStateActive[findChatIndex].messages,
        action.newMessage,
      ];
      return {
        ...state,
        chatList: {
          ...state.chatList,
          active: {
            ...state.chatList.active,
            chats: [...newStateActive],
          },
        },
      };
    case CHAT_TYPING: {
      const newStateTyping = JSON.parse(JSON.stringify(state.chatList.active.chats));
      const findChatTypingIndex = newStateTyping.findIndex((chat) => chat.id === action.id);
      newStateTyping[findChatTypingIndex].isTyping = action.value;
      return {
        ...state,
        chatList: {
          ...state.chatList,
          active: {
            ...state.chatList.active,
            chats: [...newStateTyping],
          },
        },
      };
    }
    default:
      return state;
  }
}
