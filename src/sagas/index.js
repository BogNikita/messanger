import { all } from 'redux-saga/effects';
import fetchAuthWotcher from './auth';
import fetchAutoCompleteWotcher from './autoComplete';
import fetchChatWotcher from './chat';

export default function* rootSaga() {
  yield all([fetchAuthWotcher(), fetchChatWotcher(), fetchAutoCompleteWotcher()]);
}
