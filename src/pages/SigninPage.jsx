import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { fetchRequest } from '../store/action/auth';
import Signin from '../components/Signin';
import classes from './Page.module.css';

export default function SigninPage() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(fetchRequest(email, password));
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Поле не должно быть пустым';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Некорректный email';
      } else if (!values.password) {
        errors.password = 'Поле не должно быть пустым';
      }
      return errors;
    },
  });

  return (
    <div className={classes.AuthLayout}>
      <h1>
        Авторизация <i className="fab fa-empire"></i>
      </h1>
      <Signin {...formik} {...state} fieldLogin="email" fieldPassword="password" />
      <div className={classes.LinkWrapper}>
        <Link to="/auth/signup" className={classes.Link}>
          Зарегистрироваться
        </Link>
        <Link to="/auth/forgot" className={classes.Link}>
          Забыли пароль?
        </Link>
      </div>
    </div>
  );
}
