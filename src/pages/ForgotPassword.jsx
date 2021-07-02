import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import { useInputValue } from '../hooks/input.hook';
import Button from '../components/Button';
import Error from '../components/Error';
import Input from '../components/Input';
import classes from './Page.module.css';

export default function ForgotPassword() {
  const [isError, setError] = useState(false);
  const [message, setMessage] = useState('');
  const emailInput = useInputValue('');

  const sendPasswordReset = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      await firebase.auth().sendPasswordResetEmail(emailInput.value());
      setMessage('Вам отправлено письмо для сброса пароля');
    } catch (e) {
      setError(true);
      setMessage(e.message);
    }
  };

  const MessageElement = () => {
    if (isError && message) {
      return <Error message={message} />;
    } else if (message) {
      return <span>{message}</span>;
    } else {
      return null;
    }
  };
  return (
    <div className={classes.AuthLayout}>
      <h1>Забыли пароль</h1>
      <form onSubmit={sendPasswordReset} className={classes.ForgotPassword}>
        <Input type="text" title="Email" widthInput="100%" {...emailInput.bind} />
        <MessageElement />
        <Button type="submit">Отправить ссылку на восстановление</Button>
        <Link to="/auth" className={classes.Link}>
          Назад
        </Link>
      </form>
    </div>
  );
}
