import React from 'react';
import moment from 'moment';
import classes from './DialogIsOver.module.css'

export default function DialogIsOver({ timestamp, chatRate }) {
  const rate = () =>
    Array(5)
      .fill('')
      .map((_, i) => {
        if (i < chatRate) {
          return <i key={`star_${i}`} className="fas fa-star gold-star"></i>;
        } else return <i key={`star_${i}`} className="far fa-star gold-star"></i>;
      });
  return (
    <div className={classes.DialogIsOverWrapper}>
      <i>Диалог завершился {moment(timestamp).fromNow()}</i>
      <span>Оценка диалога {rate()}</span>
    </div>
  );
}
