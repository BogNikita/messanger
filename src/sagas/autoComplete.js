import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_AUTO_COMPLETE_REQUEST } from '../store/action/action.type';
import { fetchAutoCompleteError, fetchAutoCompleteSuccess } from '../store/action/autoComplete';
import firebase from 'firebase/app';

function* fetchAutoCompleteWorker() {
  try {
    const database = firebase.database();
    const data = yield call([database, database.ref], 'autoCompleteMessage');
    const result = yield call([data, data.once], 'value');
    yield put(fetchAutoCompleteSuccess(result.val()));
  } catch (e) {
    yield put(fetchAutoCompleteError(e.message));
  }
}

function* fetchAutoCompleteWotcher() {
  yield takeLatest(FETCH_AUTO_COMPLETE_REQUEST, fetchAutoCompleteWorker);
}

export default fetchAutoCompleteWotcher;
