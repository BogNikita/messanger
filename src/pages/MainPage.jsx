import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ChatField from '../components/ChatField/ChatField';
import MessageField from '../components/MessageField/MessageField';
import classes from './Page.module.css';

export default function MainPage() {
  const { token } = useSelector((state) => state.auth);

  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/auth');
    }
  }, [history, token]);

  return (
    <div className={classes.MainLayout}>
      <ChatField />
      <MessageField />
    </div>
  );
}
