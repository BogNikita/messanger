import { combineReducers } from 'redux';
import auth from './auth';
import chat from './chat';
import userDialogSettings from './userDialogSettings';

const rootReducer = combineReducers({
  auth,
  chat,
  userDialogSettings
});

export default rootReducer;
