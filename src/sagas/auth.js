import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_AUTH_REQUEST } from '../store/action/action.type';
import { fetchError, fetchSuccess } from '../store/action/auth';
import firebase from 'firebase/app';

function* fetchAuthWorker({ email, password }) {
  try {
    const auth = firebase.auth();
    const data = yield call([auth, auth.signInWithEmailAndPassword], email, password);
    const token = data.user.uid;
    yield put(fetchSuccess(token, email));
  } catch (e) {
    yield put(fetchError(e.message));
  }
}

function* fetchAuthWotcher() {
  yield takeLatest(FETCH_AUTH_REQUEST, fetchAuthWorker);
}

export default fetchAuthWotcher;
