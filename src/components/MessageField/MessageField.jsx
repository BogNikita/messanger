import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeChatStatus } from '../../store/action/activeChat';
import moment from 'moment';
import Input from '../Input/Input';
import Button from '../Button/Button';
import classes from './MessageField.module.css';


export default function MessageField() {
  const [chat, setChat] = useState();
  const [isContinue, setIsContinue] = useState(false);
  const activeChat = useSelector((state) => state.activeChat);
  const { email } = useSelector((state) => state.auth);

  useEffect(() => {
    setChat(activeChat);
  }, [activeChat]);
  const dispatch = useDispatch();

  const clickHandler = (status, email) => {
    if (status === 'active' || status === 'waiting') {
      setIsContinue(true);
    }
    const { id } = chat;
    if (status !== 'active') {
      dispatch(fetchChangeChatStatus(id, status, email));
    }
  };

  const ActionButton = () => {
    switch (chat.status) {
      case 'waiting':
        return <Button onClick={() => clickHandler('active', email)}>Войти в чат</Button>;
      case 'active':
        return isContinue ? (
          <>
            <Input />
            <Button>Отправить сообщение</Button>
          </>
        ) : (
          <Button onClick={() => clickHandler('active')}>Продолжить чат</Button>
        );
      case 'offline':
        return <Button onClick={() => clickHandler('save')}>Сохранить чат</Button>;
      case 'save':
        return <Button onClick={() => clickHandler('offline')}>Удалить чат</Button>;
      default:
        break;
    }
  };

  return (
    <div className={classes.MessageField}>
      <div className={classes.wrapper}>
        <h2>{chat?.messages[0]?.writtenBy}</h2>
        <div>
          {chat?.messages?.map((item, i, arr) => (
            <div
              key={`${item.timestamp}_${i}`}
              className={classes.Message}
              style={{ textAlign: `${item.writtenBy !== arr[0].writtenBy ? 'right' : 'left'}` }}>
              <span>{item.content}</span>
              <time>{moment(item.timestamp).format('LT')}</time>
            </div>
          ))}
        </div>
        {chat?.rate && <span>Оценка чата {chat.rate} из 5</span>}
        <form onSubmit={(e) => e.preventDefault()}>{chat?.status && ActionButton()}</form>
      </div>
    </div>
  );
}
