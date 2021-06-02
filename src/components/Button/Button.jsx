import React from 'react';
import classes from './Button.module.css';

export default React.memo(function Button({ type, children, onClick }) {
  return (
    <button className={classes['button-primary']} type={type} onClick={onClick}>
      {children}
    </button>
  );
});
