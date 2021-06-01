import React from 'react';
import classes from './layout.module.css';

export default function SignupLayout(props) {
  return <div className={classes['signup-layuout']}>{props.children}</div>;
}
