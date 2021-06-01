import auth from './auth';
import chat from './chat';
import activeChat from './activeChat'
import { reducer as formReducer } from 'redux-form';

const { combineReducers } = require('redux');
const rootReducer = combineReducers({
  auth,
  form: formReducer,
  chat,
  activeChat,
});

export default rootReducer;
