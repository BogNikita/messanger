import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Error from '../Error';
import Input from '../Input';
import classes from './Signup.module.css';

export default function Signup(props) {
  const {
    fieldLogin,
    fieldPassword,
    fieldConfirmPassword,
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
        minWidth="280"
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
        minWidth="280"
      />

      <Input
        type="password"
        name={fieldConfirmPassword}
        title="Повторите пароль"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[fieldConfirmPassword]}
        placeholder="123456"
        errors={isFieldError(fieldConfirmPassword)}
        minWidth="280"
      />

      <Button type="submit">Зарегистрироваться</Button>
      {isPending && 'Loading...'}
      {isError && <Error message={errorMessage} />}
      <div className={classes.LinkWrapper}>
        <Link to='/auth' className={classes.Link}>Войти</Link>
        <Link to='/auth' className={classes.Link}>Зарегистрироваться через соц. сеть</Link>
      </div>
    </form>
  );
}
