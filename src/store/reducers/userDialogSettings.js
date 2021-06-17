import {
  FETCH_USER_DIALOG_SETTINGS_REQUEST,
  FETCH_USER_DIALOG_SETTINGS_SUCCESS,
  FETCH_USER_DIALOG_SETTINGS_FAILURE,
  UPDATE_USER_DIALOG_SETTINGS,
} from '../action/action.type';

const initialState = {
  messages: [],
  autoGreeting: '',
  isPending: null,
  isSuccess: null,
  isError: null,
  errorMessage: '',
};

export default function userDialogSettings(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_DIALOG_SETTINGS_REQUEST:
      return {
        ...state,
        isPending: true,
        isError: null,
      };
    case FETCH_USER_DIALOG_SETTINGS_SUCCESS:
      return {
        ...state,
        token: action.token,
        isPending: false,
        isSuccess: true,
        errorMessage: '',
        messages: action.messages,
        autoGreeting: action.autoGreeting,
      };
    case FETCH_USER_DIALOG_SETTINGS_FAILURE:
      return {
        ...state,
        isPending: false,
        isError: true,
        errorMessage: action.error,
      };
    case UPDATE_USER_DIALOG_SETTINGS:
      return {
        ...state,
        messages: action.messages,
        autoGreeting: action.autoGreeting,
      };
    default:
      return state;
  }
}
