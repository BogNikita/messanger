import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddNewMessage, fetchChangeChatStatus } from '../../store/action/activeChat';
import { fetchAutoCompleteRequest } from '../../store/action/autoComplete';
import Active from './Active';
import MessageList from './MessageList';
import classes from './MessageField.module.css';

export default React.memo(function MessageField() {
  const activeChat = useSelector((state) => state.activeChat);
  const autoComplete = useSelector((state) => state.autoComplete.messages);
  const { email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [selectMessage, setSelectMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isContinue, setIsContinue] = useState(false);

  useEffect(() => {
    setIsContinue(false);
    dispatch(fetchAutoCompleteRequest());
  }, [activeChat, dispatch]);

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
      let content = '';
      if (selectMessage && selectMessage.length) {
        content = selectMessage?.reduce((acc, item) => acc + ' ' + item.label, '');
      }
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
    },
    [selectMessage, inputMessage, email, dispatch, activeChat],
  );

  const rate = () =>
    Array(5)
      .fill('')
      .map((_, i) => {
        if (i < activeChat.rate) {
          return <i key={`star_${i}`} className="fas fa-star"></i>;
        } else return <i key={`star_${i}`} className="far fa-star"></i>;
      });

  return (
    <div className={classes.MessageField}>
      <h2>{activeChat?.messages[0]?.writtenBy}</h2>
      <div className={classes.Wrapper}>
        <MessageList messages={activeChat.messages} />
        {activeChat?.rate && <span className={classes.Rate}>Оценка чата {rate()}</span>}
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
          />
        )}
      </form>
    </div>
  );
});
