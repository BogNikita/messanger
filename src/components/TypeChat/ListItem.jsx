import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChat } from '../../store/action/activeChat';
import InfiniteScroll from 'react-infinite-scroller';
import firebase from 'firebase/app';
import ChatListItem from './ChatListItem';
import classes from './TypeChat.module.css';


export default React.memo(function ListItem({ title, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.activeChat);

  const fetchChats = useCallback(
    (count) => {
      firebase
        .database()
        .ref('chatList')
        .orderByChild('status')
        .limitToFirst(count)
        .equalTo(type)
        .once('value')
        .then((snapshot) => {
          const data = snapshot.val();
          if (data === null) {
            setChats([]);
            return;
          }
          const result = Object.values(data);
          sethasMore(result.length >= count);
          setChats(result);
        });
    },
    [type],
  );

  useEffect(() => {
    if (type === 'waiting') {
      setIsOpen(true);
    }
    fetchChats(1);
  }, [fetchChats, type]);

  useEffect(() => {
    fetchChats(1);
  }, [fetchChats, status]);

  const clickHandler = useCallback(
    (chat) => {
      dispatch(getChat(chat));
    },
    [dispatch],
  );

  return (
    <li type={type}>
      <h3 onClick={() => setIsOpen(!isOpen)}>
        <i className={`fas fa-angle-${isOpen ? 'down' : 'right'}`}></i>
        &nbsp;{title}
      </h3>
      <ul className={classes.ListItem}>
        {isOpen && (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchChats(chats.length + 1)}
            hasMore={hasMore && !!chats.length}
            useWindow={false}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }>
            {chats.length ? (
              chats.map((chat, i) => (
                <ChatListItem key={`${chat.id}_${i}`} chat={chat} clickHandler={clickHandler}/>
              ))
            ) : (
              <span>{title} чаты не добавлены</span>
            )}
          </InfiniteScroll>
        )}
      </ul>
    </li>
  );
});
