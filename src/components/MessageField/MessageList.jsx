import React, { useRef, useEffect } from 'react';
import MessageItem from '../MessageItem/MessageItem';

export default React.memo(function MessageList({ messages }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(scrollToBottom, [messages]);
  return (
    <>
      {messages?.map((item, i, arr) => (
        <MessageItem
          key={`${item.timestamp}_${i}`}
          timestamp={item.timestamp}
          content={item.content}
          author={arr[0].writtenBy}
          user={item.writtenBy}
          imgSrc={item.imgSrc}
        />
      ))}
      <div ref={messagesEndRef} />
    </>
  );
});
