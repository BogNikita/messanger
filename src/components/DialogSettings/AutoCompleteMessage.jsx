import React from 'react';
import Input from '../Input/Input';
import classes from './DialogSettings.module.css';

export default function AutoCompleteMessage({ message }) {
  return (
    <li className={classes.DialogSettingsListItem}>
      <Input defaultValue={message} title='Фраза'/>
      <div>
        <span className={classes.DialogSettingsListItemIcon}>
          <i className="far fa-trash-alt"></i>
        </span>
      </div>
    </li>
  );
}
