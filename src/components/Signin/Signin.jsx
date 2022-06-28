import React, { useCallback, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Button from '../Button';
import Input from '../Input';
import classes from './Signin.module.css';

export default function Signin(props) {
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

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isError, errorMessage]);

  return (
    <form className={classes.FormSignin} onSubmit={handleSubmit}>
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

      <Button type="submit">Войти</Button>
      {isPending && 'Loading...'}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </form>
  );
}
