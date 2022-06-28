import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { firebaseConfig } from './config/firebase.config';
import moment from 'moment';
import 'moment/locale/ru';
import * as Sentry from '@sentry/react';
import { sentryConfig } from './config/sentry.config';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

moment.locale('ru');

firebase.initializeApp(firebaseConfig);
Sentry.init(sentryConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
