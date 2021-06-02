import React from 'react';
import ChatListItem from './ChatListItem';

export default function ChatList({ chats, title, clickHandler }) {
  if (chats?.length) {
    return chats?.map((chat, i) => (
      <ChatListItem key={`${chat.id}_${i}`} chat={chat} clickHandler={clickHandler} />
    ));
  }
  return <span>{title} чаты не добавлены</span>;
}
