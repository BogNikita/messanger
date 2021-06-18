import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { fetchUserDialogSettingsRequest } from '../store/action/userDialogSettings';
import ChatField from '../components/ChatField/ChatField';
import MessageField from '../components/MessageField/';
import classes from './Page.module.css';

export default function MainPage() {
  const { token } = useSelector((state) => state.auth);
  const { chatId, status } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/auth');
    }
    dispatch(fetchUserDialogSettingsRequest(token));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className={classes.MainLayout}>
      <ChatField />
      <MessageField chatId={chatId} status={status} />
    </div>
  );
}
