import { put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_UPDATE_USER_DIALOG_SETTINGS,
  FETCH_USER_DIALOG_SETTINGS_REQUEST,
} from '../store/action/action.type';
import {
  fetchUserDialogSettingsError,
  fetchUserDialogSettingsSuccess,
  updateUserDialogSettings,
} from '../store/action/userDialogSettings';
import firebase from 'firebase/app';

function* fetchUserDialogSettingsWorker({ token }) {
  try {
    const data = yield firebase.database().ref(`userSettings/${token}`).once('value');
    const resolve = data.val();
    if (resolve) {
      const { messages, autoGreeting } = resolve;
      yield put(fetchUserDialogSettingsSuccess(messages, autoGreeting));
    }
  } catch (e) {
    yield put(fetchUserDialogSettingsError(e.message));
  }
}

function* fetchUserDialogSettingsUpdateWorker({ token, messages, autoGreeting }) {
  try {
    yield firebase.database().ref(`userSettings/${token}`).set({
      messages,
      autoGreeting,
    });
    yield put(updateUserDialogSettings(messages, autoGreeting));
  } catch (e) {
    yield put(fetchUserDialogSettingsError(e.message));
  }
}

function* fetchUserDialogSettingsWotcher() {
  yield takeLatest(FETCH_USER_DIALOG_SETTINGS_REQUEST, fetchUserDialogSettingsWorker);
  yield takeLatest(FETCH_UPDATE_USER_DIALOG_SETTINGS, fetchUserDialogSettingsUpdateWorker);
}

export default fetchUserDialogSettingsWotcher;
