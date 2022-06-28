import React, { useCallback, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  Button,
  Input,
  Col,
  Form,
  FormGroup,
  Label,
  FormFeedback,
} from 'reactstrap';
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
    <Form onSubmit={handleSubmit} className={classes.FormSignup}>
      <FormGroup row>
        <Label for="email" sm={3}>
          Email
        </Label>
        <Col sm={9}>
          <Input
            type="email"
            name={fieldLogin}
            id="email"
            placeholder="email@email.com"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[fieldLogin]}
            invalid={!!isFieldError(fieldLogin)}
          />
          <FormFeedback>{isFieldError(fieldLogin)}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="password" sm={3}>
          Пароль
        </Label>
        <Col sm={9}>
          <Input
            type="password"
            name={fieldPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[fieldPassword]}
            id="password"
            placeholder="123456qQ"
            invalid={!!isFieldError(fieldPassword)}
          />
          <FormFeedback>{isFieldError(fieldPassword)}</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="password" sm={3}>
          Повторите пароль
        </Label>
        <Col sm={9}>
          <Input
            type="password"
            name={fieldConfirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[fieldConfirmPassword]}
            id="password"
            invalid={!!isFieldError(fieldConfirmPassword)}
          />
          <FormFeedback>{isFieldError(fieldConfirmPassword)}</FormFeedback>
        </Col>
      </FormGroup>
      <Button type="submit" color="primary" disabled={isPending}>Зарегистрироваться</Button>
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
    </Form>
  );
}
