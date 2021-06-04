import React from 'react';
import moment from 'moment';
import classes from './MessageItem.module.css';


export default function MessageItem({ timestamp, content, author, user, imgSrc }) {
  return (
    <div
      className={classes.Message}
      style={{ alignSelf: `${author !== user ? 'flex-end' : ''}` }}>
      <span>{content}</span>
      {imgSrc && <img src={imgSrc} alt="content img" />}
      <time>{moment(timestamp).calendar()}</time>
    </div>
  );
}
