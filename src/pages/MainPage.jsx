import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchUserDialogSettingsRequest } from '../store/action/userDialogSettings';
import ChatField from '../components/ChatField/ChatField';
import MessageField from '../components/MessageField/MessageField';
import classes from './Page.module.css';

export default function MainPage({ chatId, status }) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/auth');
    }
    dispatch(fetchUserDialogSettingsRequest(token));
  }, [history, token]);

  return (
    <div className={classes.MainLayout}>
      <ChatField />
      <MessageField chatId={chatId} status={status} />
    </div>
  );
}
