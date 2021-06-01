import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import ChatList from '../components/ChatList/ChatList';
import MainLayout from '../components/layout/MainLayout';
import MessageField from '../components/MessageField/MessageField';

export default function MainPage() {
  const { token } = useSelector((state) => ({
    token: state.auth.token,
  }));

  const history = useHistory();

  useEffect(() => {
    if (!token) {
      history.push('/auth');
    }
  }, [history, token]);

  return (
    <MainLayout>
      <ChatList />
      <MessageField />
      <div></div>
    </MainLayout>
  );
}
