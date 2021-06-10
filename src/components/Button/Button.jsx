import React from 'react';
import classes from './Button.module.css';

export default React.memo(function Button({ type, children, onClick, style }) {
  return (
    <button className={`${classes.ButtonPrimary}${style ? ' '+ style : ''}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
});
