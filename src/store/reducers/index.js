import { combineReducers } from 'redux';
import auth from './auth';
import chat from './chat';
import userDialogSettings from './userDialogSettings';
import styles from './styles';

const rootReducer = combineReducers({
  auth,
  chat,
  userDialogSettings,
  styles
});

export default rootReducer;
