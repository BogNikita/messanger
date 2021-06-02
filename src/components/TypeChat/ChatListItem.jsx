import React from 'react';
import moment from 'moment';
import classes from './TypeChat.module.css';

export default function ChatListItem({ chat, clickHandler }) {
  const lastMessage = chat?.messages[chat.messages.length - 1]?.content;
  return (
    <li className={classes.gridContainer} onClick={() => clickHandler(chat)}>
      <div className={classes.Client}>
        <i className="fas fa-user-circle"></i>&nbsp;
        {chat.messages[0].writtenBy}
      </div>
      <div className={classes.LastMessage}>
        {lastMessage}
      </div>
      <div className={classes.Time}>
        <time>{moment(chat.messages[chat.messages.length - 1].timestamp).fromNow()}</time>
      </div>
    </li>
  );
}
