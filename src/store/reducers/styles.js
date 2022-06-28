import { CHANGE_PASSWORD, CLOSE_CHATLIST, OPEN_CHATLIST } from '../action/action.type';

const initialState = {
  isOpenChatList: null,
  changePassword: null,
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
    case CHANGE_PASSWORD: {
      return {
        ...state,
        changePassword: action.payload
      }
    }
    default:
      return state;
  }
}
