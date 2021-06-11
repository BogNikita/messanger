/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { usePubNub } from 'pubnub-react';
import { fetchAddNewMessage, fetchChangeChatStatus } from '../../store/action/chat';
import Active from './Active';
import MessageList from './MessageList';
import DialogIsOver from '../DialogIsOver/DialogIsOver';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import DialogSettings from '../DialogSettings/DialogSettings';
import classes from './MessageField.module.css';

export default React.memo(function MessageField({ status, chatId }) {
  const { chatList } = useSelector((state) => state.chat);
  const { messages, autoGreeting } = useSelector((state) => state.userDialogSettings);
  const { email } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const pubnub = usePubNub();
  const history = useHistory();

  const [selectMessage, setSelectMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isContinue, setIsContinue] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const activeChat = chatList[status]?.chats.find((chat) => chat.id === +chatId);

  const prevStatus = useRef(status)

  useEffect(() => {
    setIsContinue(false);
    if (prevStatus.current === 'waiting') {
      setIsContinue(true)
    }
  }, [chatId]);

  const newStatus = useRef({
    offline: 'save',
    save: 'offline',
    waiting: 'active',
  });

  const clickHandler = useCallback(
    (status, email) => {
      if (status === 'active' || status === 'waiting') {
        setIsContinue(true);
      }
      if (status !== 'active') {
        dispatch(fetchChangeChatStatus(+chatId, status, newStatus.current[status], email));
        history.push(`/${newStatus.current[status]}/${chatId}`);
        if (status === 'waiting' && autoGreeting) {
          sendMessage(autoGreeting);
        }
      }
    },
    [chatId, autoGreeting],
  );

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (inputMessage || selectMessage.length) {
      let content = selectMessage?.reduce((acc, item) => acc + ' ' + item.label, '') || '';
      content += ' ' + inputMessage;
      sendMessage(content);
      setInputMessage('');
      setSelectMessage(null);
    }
  };

  return (
    <div className={classes.MessageField}>
      <div className={classes.HeaderWrapper}>
        <div>
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
      <form className={classes.MessageForm} onSubmit={onSubmitHandler}>
        {activeChat?.status && (
          <Active
            status={status}
            email={email}
            clickHandler={clickHandler}
            isContinue={isContinue}
            setSelectMessage={setSelectMessage}
            inputMessage={inputMessage}
            selectMessage={selectMessage}
            setInputMessage={setInputMessage}
            autoComplete={messages}
            pubnub={pubnub}
            channels={activeChat.id}
            isTyping={activeChat.isTyping}
          />
        )}
      </form>
    </div>
  );
});
