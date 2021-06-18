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
  widthInput,
  minWidth,
}) {
  const cls = () => {
    if (widthInput) {
      return [classes['primary-input'], classes.WidthInput].join(' ');
    } else {
      return classes['primary-input'];
    }
  };
  return (
    <>
      <div className={classes['input-body']}>
        <div className={classes['input-wrapper']}>
          {title && <label htmlFor={name}>{title}:</label>}
          <input
            className={cls()}
            style={{ minWidth: minWidth ? minWidth + 'px' : 0 }}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            autoComplete="off"
            defaultValue={defaultValue}
          />
        </div>
        {errors && <span className={classes['input-error']}>{errors}</span>}
      </div>
    </>
  );
});
