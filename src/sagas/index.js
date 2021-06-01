import { all } from 'redux-saga/effects';
import fetchAuthWotcher from './auth';
import fetchChatWotcher from './chat';

export default function* rootSaga() {
  yield all([fetchAuthWotcher(), fetchChatWotcher()]);
}
