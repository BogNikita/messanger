import React from 'react';
import { useField } from 'formik';
import Input from '../Input/Input';
import classes from './DialogSettings.module.css';

export default React.memo(function AutoCompleteMessage({ removeItem, index, ...props }) {
  const [field] = useField(props);
  return (
    <li className={classes.DialogSettingsListItem}>
      <Input {...field} {...props} title="Фраза" />
      <div>
        <span className={classes.DialogSettingsListItemIcon} onClick={() => removeItem(index)}>
          <i className="far fa-trash-alt"></i>
        </span>
      </div>
    </li>
  );
});
