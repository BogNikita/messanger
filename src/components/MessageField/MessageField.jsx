import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChangeChatStatus } from '../../store/action/activeChat';
import Active from './Active';
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
    setIsContinue(false);
  }, [activeChat]);

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

  const rate = () =>
    Array(5)
      .fill('')
      .map((_, i) => {
        if (i < chat.rate) {
          return <i key={`star_${i}`} className="fas fa-star"></i>;
        } else return <i key={`star_${i}`} className="far fa-star"></i>;
      });

      const test = chat?.status === 'active' && isContinue

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
      <form className={classes.MessageForm} onSubmit={(e) => e.preventDefault()}>
        {chat?.status && (
          <Active
            status={chat.status}
            email={email}
            clickHandler={clickHandler}
            isContinue={isContinue}
            test={test}
          />
        )}
      </form>

      
    </div>
  );
});
