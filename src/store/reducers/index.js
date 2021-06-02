import auth from './auth';
import chat from './chat';
import activeChat from './activeChat';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  chat,
  activeChat,
});

export default rootReducer;
