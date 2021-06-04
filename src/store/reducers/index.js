import { combineReducers } from 'redux';
import auth from './auth';
import chat from './chat';
import activeChat from './activeChat';
import autoComplete from './autoComplete';

const rootReducer = combineReducers({
  auth,
  chat,
  activeChat,
  autoComplete
});

export default rootReducer;
