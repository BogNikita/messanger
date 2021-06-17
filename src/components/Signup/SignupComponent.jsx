import React, { useCallback } from 'react';
import Button from '../Button/Button';
import Error from '../Error/Error';
import Input from '../Input/Input';
import classes from './Signup.module.css';

export default function SignupComponent(props) {
  const {
    fieldLogin,
    fieldPassword,
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isPending,
    isError,
    errorMessage,
  } = props;

  const isFieldError = useCallback(
    (name) => errors[name] && touched[name] && errors[name],
    [errors, touched],
  );

  return (
    <form className={classes.FormSignup} onSubmit={handleSubmit}>
      <Input
        type="email"
        name={fieldLogin}
        title="Email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[fieldLogin]}
        placeholder="email@email.com"
        errors={isFieldError(fieldLogin)}
        minWidth='280'
      />

      <Input
        type="password"
        name={fieldPassword}
        title="Пароль"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[fieldPassword]}
        placeholder="123456"
        errors={isFieldError(fieldPassword)}
        minWidth='280'
      />

      <Button type="submit">Войти</Button>
      {isPending && 'Loading...'}
      {isError && <Error message={errorMessage} />}
    </form>
  );
}
