import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
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

  const { changePassword } = useSelector((state) => state.styles);

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

  useEffect(() => {
    if (changePassword) {
      toast.success('Пароль успешно обновлен', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [changePassword]);

  return (
    <Form onSubmit={handleSubmit} className={classes.FormSignin}>
      <FormGroup row>
        <Label for="email" sm={2}>
          Email
        </Label>
        <Col sm={10}>
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
        <Label for="password" sm={2}>
          Пароль
        </Label>
        <Col sm={10}>
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
      <Button type="submit" color="primary" disabled={isPending}>Войти</Button>
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
