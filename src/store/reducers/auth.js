import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SUCCESS,
  FETCH_AUTH_FAILURE,
  AUTH_LOGOUT,
  CHANGE_AVATAR,
  UPDATE_PROFILE,
} from '../action/action.type';

const initialState = {
  user: null,
  isPending: null,
  isSuccess: null,
  isError: null,
  errorMessage: '',
  email: null,
  token: null
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
        user: action.user,
        isPending: false,
        isSuccess: true,
        errorMessage: '',
        isError: false,
        email: action.email,
        token: action.user.uid
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
        user: null,
        email: null,
        token: null
      }
    }
    case CHANGE_AVATAR: {
      return {
        ...state,
        user: {
          ...state.user, photoURL: action.photoURL
        }
      }
    }
    case UPDATE_PROFILE: {
      return {
        ...state,
        user: {
          ...state.user, photoURL: action.photoURL, displayName: action.displayName
        }
      }
    }
    default:
      return state;
  }
}
