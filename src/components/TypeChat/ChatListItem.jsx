import React from 'react';
import moment from 'moment';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import classes from './TypeChat.module.css';

export default function ChatListItem({ chat, clickHandler }) {

  const { content, timestamp } = chat?.messages[chat?.messages?.length - 1];
  return (
    <li className={classes.gridContainer} onClick={() => clickHandler(chat)}>
      <div className={classes.Client}>
        <i className="fas fa-user-circle"></i>&nbsp;
        {chat.messages[0].writtenBy}
      </div>
      <div className={classes.LastMessage}>{content}</div>
      <div
        className={classes.Time}
        style={{ justifyContent: chat.typing ? 'space-between' : 'flex-end' }}>
        {chat.typing && <TypingIndicator />}
        <time>{moment(timestamp).fromNow()}</time>
      </div>
    </li>
  );
}
