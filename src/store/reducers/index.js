import { combineReducers } from 'redux';
import auth from './auth';
import chat from './chat';
import activeChat from './activeChat';
import userDialogSettings from './userDialogSettings';

const rootReducer = combineReducers({
  auth,
  chat,
  activeChat,
  userDialogSettings
});

export default rootReducer;
