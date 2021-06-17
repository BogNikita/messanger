import React from 'react';
import moment from 'moment';
import classes from './MessageItem.module.css';

export default function MessageItem({ timestamp, content, author, user, imgSrc }) {
  return (
    <div className={classes.Message} style={{ alignSelf: `${author !== user ? 'flex-end' : ''}` }}>
      <span>{content}</span>
      {imgSrc && <img src={imgSrc} alt="content img" className={classes.MessageImg}/>}
      <time className={classes.MessageTime}>{moment(timestamp).calendar()}</time>
    </div>
  );
}
