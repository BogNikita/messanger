import { put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_ADD_NEW_MESSAGE,
  FETCH_CHANGE_CHAT_STATUS,
  FETCH_CHAT_REQUEST,
} from '../store/action/action.type';
import {
  fetchChatError,
  fetchChatSuccess,
  addNewMessage,
  changeChatStatus,
} from '../store/action/chat';
import firebase from 'firebase/app';

function* fetchChatWorker({ count, status }) {
  try {
    const res = yield firebase
      .database()
      .ref('chatList')
      .orderByChild('status')
      .limitToLast(count)
      .equalTo(status)
      .once('value');
    const data = res.val();
    if (!!data) {
      const filter = Object.values(data).filter((item) => item);
      yield put(fetchChatSuccess(filter, status, filter.length >= count));
    }
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchChangeChatStatusWorker({ id, newStatus, email, oldStatus, name }) {
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
          if (name) {
            key.ref.child('operatorName').set(name);
          }
        });
      });
    yield put(changeChatStatus(id, newStatus, email, oldStatus));
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchAddNewMessageWorker({ id, newMessage, index }) {
  try {
    yield firebase
      .database()
      .ref(`chatList/${id - 1}/messages/${index}`)
      .set({ ...newMessage });
    yield put(addNewMessage(id, newMessage));
  } catch (e) {
    yield put(fetchChatError(e.message));
  }
}

function* fetchChatWotcher() {
  yield takeEvery(FETCH_CHAT_REQUEST, fetchChatWorker);
  yield takeEvery(FETCH_CHANGE_CHAT_STATUS, fetchChangeChatStatusWorker);
  yield takeEvery(FETCH_ADD_NEW_MESSAGE, fetchAddNewMessageWorker);
}

export default fetchChatWotcher;
