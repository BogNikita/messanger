/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchChatRequest } from '../../store/action/chat';
import { closeChatList } from '../../store/action/styles';
import InfiniteScroll from 'react-infinite-scroller';
import ChatList from './ChatList';
import classes from './TypeChat.module.css';

export default React.memo(function ListItem({ title, type }) {
  const { hasMore, chats } = useSelector((state) => state.chat.chatList[type]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const fetchChats = useCallback(
    (count = 2) => {
      dispatch(fetchChatRequest(count, type));
    },
    [dispatch, type],
  );

  useEffect(() => {
    if (type === 'waiting') {
      setIsOpen(true);
    }
    fetchChats();
    if (type === 'waiting' || type === 'active') {
      setInterval(fetchChats, 30000);
    }
  }, [type, fetchChats]);

  const clickHandler = useCallback(
    (chat) => {
      history.push(`/${type}/${chat.id}`);
      dispatch(closeChatList())
    },
    [type],
  );

  return (
    <li>
      <h3 onClick={() => setIsOpen(!isOpen)}>
        <i className={`fas fa-angle-${isOpen ? 'down' : 'right'}`}></i>
        &nbsp;{title}
      </h3>
      <ul className={classes.ListItem}>
        {isOpen && (
          <InfiniteScroll
            pageStart={0}
            loadMore={() => fetchChats(chats.length + 1)}
            hasMore={hasMore && !!chats?.length}
            useWindow={false}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }>
            <ChatList chats={chats} title={title} clickHandler={clickHandler} />
          </InfiniteScroll>
        )}
      </ul>
    </li>
  );
});
