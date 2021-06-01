import React from 'react';
import ListItem from './ListItem';
import classes from './TypeChat.module.css';

export default function TypeChatList({ typeChats }) {
  return (
    <ul className={classes.TypeChatList}>
      {typeChats?.map((chat, i) => (
        <ListItem key={`${chat.type}_${i}`} title={chat.title} type={chat.type} />
      ))}
    </ul>
  );
}
