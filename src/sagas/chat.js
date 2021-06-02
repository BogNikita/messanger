import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_CHANGE_CHAT_STATUS, FETCH_CHAT_REQUEST } from '../store/action/action.type';
import { fetchChatError, fetchChatSuccess } from '../store/action/chat';
import { changeChatStatus } from '../store/action/activeChat';
import firebase from 'firebase/app';

function* fetchChatWorker({ count, status }) {
  try {
    const database = firebase.database();
    const data = yield call([database, database.ref], 'chatList');
    const order = yield call([data, data.orderByChild], 'status');
    const limit = yield call([order, order.limitToFirst], count);
    const equal = yield call([limit, limit.equalTo], status);
    const result = yield call([equal, equal.once], 'value');
    const req = result.val();
    if (!!req) {
      const filter = Object.values(req).filter((item) => item);
      yield put(fetchChatSuccess(filter, status, (filter.length >= count)));
    }
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchChangeChatStatusWorker({ id, newStatus, email, oldStatus }) {
  try {
    yield firebase
      .database()
      .ref('chatList')
      .orderByChild('id')
      .equalTo(id)
      .once('value', (snapshot) => {
        snapshot.forEach((key) => {
          key.ref.child('status').set(newStatus);
          if (email) {
            key.ref.child('operatorId').set(email);
          }
        });
      });
    yield put(changeChatStatus(id, newStatus, email, oldStatus));
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchChatWotcher() {
  yield takeEvery(FETCH_CHAT_REQUEST, fetchChatWorker);
  yield takeEvery(FETCH_CHANGE_CHAT_STATUS, fetchChangeChatStatusWorker);
}

export default fetchChatWotcher;
