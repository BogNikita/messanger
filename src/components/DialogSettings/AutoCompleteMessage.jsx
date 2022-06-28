import React from 'react';
import { useField } from 'formik';
import Input from '../Input';
import classes from './DialogSettings.module.css';

export default function AutoCompleteMessage({ removeItem, index, ...props }) {
  const [field] = useField(props);
  const { value = '' } = field;
  return (
    <li className={classes.DialogSettingsListItem}>
      <Input {...field} {...props} title="Фраза" value={value} />
      <div className={classes.DialogSettingsListItemIcon} onClick={() => removeItem(index)}>
        <i className="far fa-trash-alt"></i>
      </div>
    </li>
  );
}
