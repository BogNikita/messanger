import { all } from 'redux-saga/effects';
import fetchAuthWotcher from './auth';

export default function* rootSaga() {
  yield all([fetchAuthWotcher()]);
}
