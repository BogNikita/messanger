import {
  FETCH_CHAT_REQUEST,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
} from '../action/action.type';

const initialState = {
    isPending: null,
    isError: null,
    isSuccess: null,
    errorMessage: null,
    chatList: []
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
        chatList: [...action.data],
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
    default:
      return state;
  }
}
