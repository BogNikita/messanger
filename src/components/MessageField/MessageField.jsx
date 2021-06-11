import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePubNub } from 'pubnub-react';
import { fetchAddNewMessage, fetchChangeChatStatus, getChat } from '../../store/action/activeChat';
import { fetchAutoCompleteRequest } from '../../store/action/autoComplete';
import Active from './Active';
import MessageList from './MessageList';
import DialogIsOver from '../DialogIsOver/DialogIsOver';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import classes from './MessageField.module.css';
import Button from '../Button/Button';
import DialogSettings from '../DialogSettings/DialogSettings';

export default React.memo(function MessageField() {
  const activeChat = useSelector((state) => state.activeChat);
  const { chatList } = useSelector((state) => state.chat);
  const autoComplete = useSelector((state) => state.autoComplete.messages);
  const { email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pubnub = usePubNub();

  const [selectMessage, setSelectMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isContinue, setIsContinue] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsContinue(false);
    dispatch(fetchAutoCompleteRequest());
  }, [activeChat.id, dispatch]);

  useEffect(() => {
    if (activeChat.status) {
      const find = chatList[activeChat.status].chats.find((item) => item.id === activeChat.id);
      dispatch(getChat(find));
    }
  }, [chatList, dispatch]);

  const clickHandler = useCallback(
    (status, email) => {
      if (status === 'active' || status === 'waiting') {
        setIsContinue(true);
      }
      const { id } = activeChat;
      if (status !== 'active') {
        dispatch(fetchChangeChatStatus(id, status, email));
      }
    },
    [activeChat, dispatch],
  );

  const onSubmitHandler = useCallback(
    (e) => {
      e.preventDefault();
      if (inputMessage || selectMessage.length) {
        let content = selectMessage?.reduce((acc, item) => acc + ' ' + item.label, '') || '';
        content += ' ' + inputMessage;
        const newMessage = {
          content,
          imgSrc: '',
          timestamp: Date.now(),
          writtenBy: email,
        };
        dispatch(fetchAddNewMessage(activeChat.id, newMessage, activeChat.messages.length));
        setInputMessage('');
        setSelectMessage(null);
      }
    },
    [selectMessage, inputMessage, email, dispatch, activeChat],
  );

  return (
    <div className={classes.MessageField}>
      <div className={classes.HeaderWrapper}>
        <div>
          <h2>{activeChat?.messages[0]?.writtenBy || 'Добро пожаловать'}</h2>
          {activeChat.isTyping && <TypingIndicator />}
        </div>
        <DialogSettings modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>
      <div className={classes.Wrapper}>
        <div className={classes.WrapperMessageList}>
          <MessageList messages={activeChat.messages} />
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
            status={activeChat.status}
            email={email}
            clickHandler={clickHandler}
            isContinue={isContinue}
            setSelectMessage={setSelectMessage}
            inputMessage={inputMessage}
            selectMessage={selectMessage}
            setInputMessage={setInputMessage}
            autoComplete={autoComplete}
            pubnub={pubnub}
            channels={activeChat.id}
            isTyping={activeChat.isTyping}
          />
        )}
      </form>
    </div>
  );
});
