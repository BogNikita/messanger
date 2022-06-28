import { call, put, takeLatest, delay } from 'redux-saga/effects';
import {
  FETCH_AUTH_REQUEST,
  FETCH_AUTH_SIGNUP,
  FETCH_CHANGE_AVATAR,
  FETCH_GITHUB_AUTH,
  FETCH_GOOGLE_AUTH,
  FETCH_UPDATE_PROFILE,
} from '../store/action/action.type';
import { changeAvatar, clearError, fetchError, fetchSuccess, updateProfile } from '../store/action/auth';
import firebase from 'firebase/app';

function* fetchAuthWorker({ email, password }) {
  try {
    const auth = firebase.auth();
    const { user } = yield call([auth, auth.signInWithEmailAndPassword], email, password);
    yield put(fetchSuccess(user));
  } catch (e) {
    yield put(fetchError(e.message));
    yield delay(5000)
    yield put(clearError())
  }
}

function* fetchChangeAvatarWorker({ photoURL }) {
  try {
    yield put(changeAvatar(photoURL));
    const user = firebase.auth().currentUser;
    yield user.updateProfile({
      photoURL,
    });
  } catch (e) {
    yield put(fetchError(e.message));
    yield delay(5000)
    yield put(clearError())
  }
}

function* fetchUpdateProfileWorker({ displayName, photo, password }) {
  try {
    const user = firebase.auth().currentUser;
    const photoURL = photo || user.photoURL;
    yield user.updateProfile({
      displayName,
      photoURL,
    });
    if (password) {
      yield user.updatePassword(password);
    }
    yield put(updateProfile(displayName, photoURL));
  } catch (e) {
    yield put(fetchError(e.message));
    yield delay(5000)
    yield put(clearError())
  }
}

function* fetchSignupWorker({ email, password }) {
  try {
    const { user } = yield firebase.auth().createUserWithEmailAndPassword(email, password);
    yield put(fetchSuccess(user, email));
  } catch (e) {
    yield put(fetchError(e.message));
    yield delay(5000)
    yield put(clearError())
  }
}

function* fetchGoogleAuthWorker() {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = yield firebase.auth().signInWithPopup(provider);
    yield put(fetchSuccess(user));
  } catch (e) {
    yield put(fetchError(e.message));
    yield delay(5000)
    yield put(clearError())
  }
}

function* fetchGithubAuthWorker() {
  try {
    const provider = new firebase.auth.GithubAuthProvider();
    const { user } = yield firebase.auth().signInWithPopup(provider);
    yield put(fetchSuccess(user));
  } catch (e) {
    yield put(fetchError(e.message));
    yield delay(5000)
    yield put(clearError())
  }
}

function* fetchAuthWotcher() {
  yield takeLatest(FETCH_AUTH_REQUEST, fetchAuthWorker);
  yield takeLatest(FETCH_CHANGE_AVATAR, fetchChangeAvatarWorker);
  yield takeLatest(FETCH_UPDATE_PROFILE, fetchUpdateProfileWorker);
  yield takeLatest(FETCH_AUTH_SIGNUP, fetchSignupWorker);
  yield takeLatest(FETCH_GOOGLE_AUTH, fetchGoogleAuthWorker);
  yield takeLatest(FETCH_GITHUB_AUTH, fetchGithubAuthWorker);
}

export default fetchAuthWotcher;
