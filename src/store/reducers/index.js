import auth from './auth';
import { reducer as formReducer } from 'redux-form';

const { combineReducers } = require('redux');
const rootReducer = combineReducers({
  auth,
  form: formReducer,
});

export default rootReducer;
