import React from 'react';
import { ChatListItem } from './';

export default function ChatList({ chats, title, clickHandler }) {
  if (chats?.length) {
    const reverseChat = chats.sort((a,b) => b.id - a.id)
    return reverseChat.map((chat, i) => (
      <ChatListItem key={`${chat.id}_${i}`} chat={chat} clickHandler={clickHandler} />
    ));
  }
  return <span>{title} чаты не добавлены</span>;
}
