import React from 'react';
import classes from './Button.module.css';

export default React.memo(function Button({ type, children, onClick, style }) {
  const cls = style ? [classes.ButtonPrimary, style].join(' ') : classes.ButtonPrimary;

  return (
    <button className={cls} type={type} onClick={onClick}>
      {children}
    </button>
  );
});
