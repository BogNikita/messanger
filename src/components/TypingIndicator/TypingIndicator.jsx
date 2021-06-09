import React from 'react';
import './TypingIndicator.css';

export default function TypingIndicator() {
  return (
    <div className="ticontainer">
      <div className="tiblock">
        <span>typing &nbsp;</span>
        <div className="tidot"></div>
        <div className="tidot"></div>
        <div className="tidot"></div>
      </div>
    </div>
  );
}
