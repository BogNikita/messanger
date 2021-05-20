import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_MESSAGES_REQUEST } from '../store/action/action.type';
import { fetchError, fetchSuccess } from '../store/action/auth';
import firebase from 'firebase/app';

const fetchAuth = (...arg) =>
  new Promise((res) => res(firebase.auth().signInWithEmailAndPassword(...arg)));

function* fetchAuthWorker({ email, password }) {
  try {
    const user = yield call(fetchAuth, email, password);
    if (user.message) {
      yield put(fetchError(user.message));
    } else {
      yield put(fetchSuccess());
    }
  } catch (e) {
    yield put(fetchError(e.message));
  }
}

function* fetchAuthWotcher() {
  yield takeLatest(FETCH_MESSAGES_REQUEST, fetchAuthWorker);
}

export default fetchAuthWotcher;
