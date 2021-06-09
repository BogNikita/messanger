import React from 'react';
import moment from 'moment';
import classes from './DialogIsOver.module.css'

export default function DialogIsOver({ timestamp, chatRate }) {
  
  const fullOrEmptyStar = (i, rate) => <i key={`star_${i}`} className={`${i < rate ? 'fas' : 'far'} fa-star gold-star`}></i>

  const rate = () =>
    Array(5)
      .fill('')
      .map((_, i) => fullOrEmptyStar(i, chatRate));

  return (
    <div className={classes.DialogIsOverWrapper}>
      <i>Диалог завершился {moment(timestamp).fromNow()}</i>
      <span>Оценка диалога {rate()}</span>
    </div>
  );
}
