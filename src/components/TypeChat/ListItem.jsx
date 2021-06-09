import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatRequest } from '../../store/action/chat';
import { getChat } from '../../store/action/activeChat';
import InfiniteScroll from 'react-infinite-scroller';
import ChatList from './ChatList';
import classes from './TypeChat.module.css';

export default React.memo(function ListItem({ title, type }) {
  const { hasMore, chats } = useSelector((state) => state.chat.chatList[type]);
  const dispatch = useDispatch();

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
      setInterval(fetchChats, 30000)
    }
  }, [type, fetchChats]);

  const clickHandler = useCallback(
    (chat) => {
      dispatch(getChat(chat));
    },
    [dispatch],
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
