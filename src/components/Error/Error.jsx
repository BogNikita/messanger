import React from 'react';
import classes from './Error.module.css';

export default function Error({ message }) {
  return <div className={classes.Error}>{message}</div>;
}
