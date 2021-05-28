import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
  AUTH_LOGOUT,
} from '../action/action.type';

const initialState = {
  token: null,
  isPending: null,
  isSuccess: null,
  isError: null,
  errorMessage: '',
  email: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case FETCH_AUTH_REQUEST:
      return {
        ...state,
        isPending: true,
        isError: null
      };
    case FETCH_AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        isPending: false,
        isSuccess: true,
        errorMessage: '',
        email: action.email
      };
    case FETCH_AUTH_FAILURE:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: action.error
      };
    case AUTH_LOGOUT: {
      return {
        ...state,
        token: null,
        email: null
      }
    }
    default:
      return state;
  }
}
