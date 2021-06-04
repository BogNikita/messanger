import React from 'react';
import MessageItem from '../MessageItem/MessageItem';

export default function MessageList({ messages }) {
  return messages?.map((item, i, arr) => (
    <MessageItem
      key={`${item.timestamp}_${i}`}
      timestamp={item.timestamp}
      content={item.content}
      author={arr[0].writtenBy}
      user={item.writtenBy}
      imgSrc={item.imgSrc}
    />
  ));
}
