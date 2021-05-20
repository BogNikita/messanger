import React, { useCallback } from 'react';
import { Field, Form } from 'redux-form';
import Button from '../Button/Button';
import Input from '../Input/Input';
import classes from './Signup.module.css'

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
    isSuccess,
    errorMessage,
  } = props;

  const isFieldError = useCallback(
    (name) => errors[name] && touched[name] && errors[name],
    [errors, touched],
  );

  const Error = useCallback(() => {
    return <span>{errorMessage}</span>
  }, [errorMessage])

  return (
    <Form className={classes['form-signup']} onSubmit={handleSubmit}>
      <Input
        type="email"
        name={fieldLogin}
        title="Email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[fieldLogin]}
        placeholder="email@email.com"
        errors={isFieldError(fieldLogin)}
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
      />
      
      <Button type="submit">Войти</Button>
      {isPending && 'Loading...'}
      {isSuccess && 'Авторизация прошла успешно'}
      {isError && <Field name='error' component={Error}/>}
    </Form>
  );
}
