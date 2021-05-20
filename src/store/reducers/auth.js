import {
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
} from '../action/action.type';

const initialState = {
  authorization: false,
  isPending: null,
  isSuccess: null,
  isError: null,
  errorMessage: ''
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case FETCH_MESSAGES_REQUEST:
      return {
        ...state,
        authorization: true,
        isPending: true,
        isError: null
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        authorization: true,
        isPending: false,
        isSuccess: true,
      };
    case FETCH_MESSAGES_FAILURE:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: action.error
      };
    default:
      return state;
  }
}
