import React from 'react';
import classes from './Button.module.css';

export default React.memo(function Button({ type, children, onClick, style }) {
  const cls = () => {
    if (style) {
      return [classes.ButtonPrimary, style].join(' ');
    } else {
      return classes.ButtonPrimary;
    }
  };
  return (
    <button className={cls()} type={type} onClick={onClick}>
      {children}
    </button>
  );
});
