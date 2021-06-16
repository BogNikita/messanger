import React from 'react';
import classes from './input.module.css';

export default React.memo(function Input({
  type,
  name,
  value,
  onChange,
  title,
  placeholder,
  onBlur,
  errors,
  defaultValue,
  widthInput
}) {
  return (
    <>
      <div className={classes['input-wrapper']}>
        {title && <label htmlFor={name}>{title}:</label>}
        <div style={{width: `${widthInput ? widthInput : ''}`}}>
          <input
            className={classes['primary-input']}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            autoComplete="off"
            defaultValue={defaultValue}
          />
          {errors && <span className={classes['input-error']}>{errors}</span>}
        </div>
      </div>
    </>
  );
});
