import React from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { ToastContainer, toast } from 'react-toastify';
import { useInputValue } from '../hooks/input.hook';
import { Button, Form, Input, InputGroupAddon, InputGroup  } from 'reactstrap';
import classes from './Page.module.css';

export default function ForgotPassword() {
  const emailInput = useInputValue('');

  const sendPasswordReset = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().sendPasswordResetEmail(emailInput.value());
      toast.success('Вам отправлено письмо для сброса пароля', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      toast.error(e.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className={classes.AuthLayout}>
      <h1>Забыли пароль</h1>
      <Form className={classes.ForgotPassword} onSubmit={sendPasswordReset}>
        <InputGroup >
          <InputGroupAddon addonType="prepend">Email</InputGroupAddon>
          <Input type="email" title="Email" name="Email" {...emailInput.bind} placeholder='Введите Ваш email' />
        </InputGroup>
        <Button type="submit">Отправить ссылку на восстановление</Button>
      </Form>
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
      <div className={[classes.LinkWrapper, 'justify-content-end'].join(' ')}>
        <Link to="/auth" className={classes.Link}>
          Назад
        </Link>
      </div>
    </div>
  );
}
