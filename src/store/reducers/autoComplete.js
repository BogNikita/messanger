import {
  FETCH_AUTO_COMPLETE_REQUEST,
  FETCH_AUTO_COMPLETE_SUCCESS,
  FETCH_AUTO_COMPLETE_FAILURE,
} from '../action/action.type';

const initialState = {
  messages: [],
  isPending: null,
  isSuccess: null,
  isError: null,
  errorMessage: '',
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTO_COMPLETE_REQUEST:
      return {
        ...state,
        isPending: true,
        isError: null,
      };
    case FETCH_AUTO_COMPLETE_SUCCESS:
      return {
        ...state,
        token: action.token,
        isPending: false,
        isSuccess: true,
        errorMessage: '',
        messages: action.messages,
      };
    case FETCH_AUTO_COMPLETE_FAILURE:
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
