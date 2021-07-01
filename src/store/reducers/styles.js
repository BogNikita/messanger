import { CLOSE_CHATLIST, OPEN_CHATLIST } from '../action/action.type';

const initialState = {
  isOpenChatList: null,
};

export default function styles(state = initialState, action) {
  switch (action.type) {
    case OPEN_CHATLIST:
      return {
        ...state,
        isOpenChatList: true,
      };
    case CLOSE_CHATLIST:
      return {
        ...state,
        isOpenChatList: false,
      };
    default:
      return state;
  }
}
