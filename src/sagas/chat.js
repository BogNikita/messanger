import { call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_CHANGE_CHAT_STATUS, FETCH_CHAT_REQUEST } from '../store/action/action.type';
import { fetchChatError, fetchChatSuccess } from '../store/action/chat';
import { changeChatStatus } from '../store/action/activeChat';
import firebase from 'firebase/app';

function* fetchChatWorker() {
  try {
    const database = firebase.database();
    const result = yield call([database, database.ref], 'chatList');
    const data = yield call([result, result.once], 'value');
    yield put(fetchChatSuccess(data.val()));
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchChangeChatStatusWorker({ id, status, email }) {
  try {
    yield firebase
      .database()
      .ref('chatList')
      .orderByChild('id')
      .equalTo(id)
      .once('value', (snapshot) => {
        snapshot.forEach((key) => {
          key.ref.child('status').set(status);
          if (email) {
            key.ref.child('operatorId').set(email);
          }
        });
      });
    yield put(changeChatStatus(id, status));
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchChatWotcher() {
  yield takeEvery(FETCH_CHAT_REQUEST, fetchChatWorker);
  yield takeEvery(FETCH_CHANGE_CHAT_STATUS, fetchChangeChatStatusWorker);
}

export default fetchChatWotcher;
