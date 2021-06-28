/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchAddNewMessage, fetchChangeChatStatus } from '../../store/action/chat';
import { openChatList } from '../../store/action/styles';
import { MessageFieldForm } from './';
import { MessageList } from './';
import DialogIsOver from '../DialogIsOver';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import DialogSettings from '../DialogSettings';
import classes from './MessageField.module.css';

export default function MessageField({ status, chatId }) {
  const { chatList } = useSelector((state) => state.chat);
  const { messages, autoGreeting } = useSelector((state) => state.userDialogSettings);
  const {
    email,
    user: { displayName },
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const [isContinue, setIsContinue] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const activeChat = chatList[status]?.chats.find((chat) => chat.id === +chatId);
  const prevStatus = useRef(status);

  useEffect(() => {
    setIsContinue(false);
    if (prevStatus.current === 'waiting') {
      setIsContinue(true);
    }
  }, [chatId]);

  const newStatus = useRef({
    offline: 'save',
    save: 'offline',
    waiting: 'active',
  });

  const clickHandler = useCallback(() => {
    if (status === 'waiting') {
      sendNotification();
    }
    if (status === 'active' || status === 'waiting') {
      setIsContinue(true);
    }
    if (status !== 'active') {
      dispatch(
        fetchChangeChatStatus(+chatId, status, newStatus.current[status], email, displayName),
      );
      history.push(`/${chatId}/${newStatus.current[status]}`);
      if (status === 'waiting' && autoGreeting) {
        sendMessage(autoGreeting);
      }
    }
  }, [chatId, autoGreeting, status]);

  const sendNotification = useCallback(() => {
    const headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Basic NjAzODIxMTYtNDYzOS00Yzc4LTkwMTktOThlOGZjZGIyZTU1',
    };

    const endpoint = 'https://onesignal.com/api/v1/notifications';

    const params = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        app_id: '966e76c3-8930-433d-85e4-d62f11e0bde9',
        include_external_user_ids: [chatId],
        contents: { en: 'Оператор вошел в чат' },
      }),
    };
    fetch(endpoint, params).then((res) => console.log(res.status));
  }, [chatId]);

  const sendMessage = useCallback(
    (content, imgSrc = '') => {
      const newMessage = {
        content,
        imgSrc,
        timestamp: Date.now(),
        writtenBy: email,
      };
      dispatch(fetchAddNewMessage(+chatId, newMessage, activeChat.messages.length));
    },
    [email, activeChat, chatId],
  );

  return (
    <div className={classes.MessageField}>
      <div className={classes.HeaderWrapper}>
        <div className={classes.MessageFieldHeader}>
          <div className={classes.MessageFieldHeaderIcon} onClick={() => dispatch(openChatList())}>
            <i className="fas fa-arrow-left"></i>
          </div>
          <h2>{activeChat?.messages[0]?.writtenBy || 'Добро пожаловать'}</h2>
          {activeChat?.isTyping && <TypingIndicator />}
        </div>
        <DialogSettings modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>
      <div className={classes.Wrapper}>
        <div className={classes.WrapperMessageList}>
          {activeChat && <MessageList messages={activeChat?.messages} />}
          {activeChat?.rate && (
            <DialogIsOver
              chatRate={activeChat.rate}
              timestamp={activeChat.messages[activeChat.messages.length - 1].timestamp}
            />
          )}
        </div>
      </div>
      {activeChat?.status && (
        <MessageFieldForm
          status={status}
          email={email}
          clickHandler={clickHandler}
          isContinue={isContinue}
          autoComplete={messages}
          channels={activeChat.id}
          isTyping={activeChat.isTyping}
          sendMessage={sendMessage}
          name={displayName}
        />
      )}
    </div>
  );
}
