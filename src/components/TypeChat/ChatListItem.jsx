import React from 'react';
import classes from './TypeChat.module.css';
import moment from 'moment';

export default function ChatListItem({ chat, clickHandler }) {
  return (
    <li className={classes.gridContainer} onClick={() => clickHandler(chat)}>
      <div className={classes.Client}>
        <i className="fas fa-user-circle"></i>&nbsp;
        {chat.messages[0].writtenBy}
      </div>
      <div className={classes.LastMessages}>
        {chat.messages[chat.messages.length - 1].content.length > 20
          ? chat.messages[chat.messages.length - 1].content.slice(0, 20) + '...'
          : chat.messages[chat.messages.length - 1].content}
      </div>
      <div className={classes.Time}>
        <time>{moment(chat.messages[chat.messages.length - 1].timestamp).fromNow()}</time>
      </div>
    </li>
  );
}
