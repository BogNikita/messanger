import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeChatStatus } from '../../store/action/activeChat';
import Input from '../Input/Input';
import Button from '../Button/Button';
import MessageItem from '../MessageItem/MessageItem';
import classes from './MessageField.module.css';

export default React.memo(function MessageField() {
  const activeChat = useSelector((state) => state.activeChat);
  const { email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [chat, setChat] = useState();
  const [isContinue, setIsContinue] = useState(false);

  useEffect(() => {
    setChat(activeChat);
  }, [activeChat]);

  const textButton = useRef({
    active: 'Продолжить чат',
    waiting: 'Войти в чат',
    save: 'Удалить чат',
    offline: 'Сохранить чат',
  });

  const clickHandler = useCallback(
    (status, email) => {
      if (status === 'active' || status === 'waiting') {
        setIsContinue(true);
      }
      const { id } = chat;
      if (status !== 'active') {
        dispatch(fetchChangeChatStatus(id, status, email));
      }
    },
    [chat, dispatch],
  );

  const ActionButton = useCallback(() => {
    if (chat.status === 'active' && isContinue) {
      return (
        <>
          <Input />
          <Button>Отправить сообщение</Button>
        </>
      );
    } else {
      return (
        <Button onClick={() => clickHandler(chat.status, email)}>
          {textButton.current[chat.status]}
        </Button>
      );
    }
  }, [chat?.status, clickHandler, email, isContinue]);

  const rate = () =>
    Array(5)
      .fill('')
      .map((_, i) => {
        if (i < chat.rate) {
          return <i key={`star_${i}`} className="fas fa-star"></i>;
        } else return <i key={`star_${i}`} className="far fa-star"></i>;
      });

  return (
    <div className={classes.MessageField}>
        <h2>{chat?.messages[0]?.writtenBy}</h2>
        <div className={classes.Wrapper}>
          {chat?.messages?.map((item, i, arr) => (
            <MessageItem
              key={`${item.timestamp}_${i}`}
              timestamp={item.timestamp}
              content={item.content}
              author={arr[0].writtenBy}
              user={item.writtenBy}
              imgSrc={item.imgSrc}
            />
          ))}
        {chat?.rate && <span className={classes.Rate}>Оценка чата {rate()}</span>}
      </div>
      <form className={classes.MessageForm} onSubmit={(e) => e.preventDefault()}>{chat?.status && ActionButton()}</form>
    </div>
  );
});
