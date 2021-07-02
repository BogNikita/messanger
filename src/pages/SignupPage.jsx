import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { fetchSignup } from '../store/action/auth';
import Signup from '../components/Signup';
import classes from './Page.module.css';

export default function SigninPage() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(fetchSignup(email, password));
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Обязательно';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Некорректный email';
      } else if (!values.password) {
        errors.password = 'Обязательно';
      } else if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(values.password)) {
        errors.password = 'Пароль должен содержать цифру, буквы в нижнем и верхнем регистре и иметь длину не менее 8 знаков';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Пароли должны совпадать';
      }
      return errors;
    },
  });

  return (
    <div className={classes.AuthLayout}>
      <h1>Регистрация</h1>
      <Signup
        {...formik}
        {...state}
        fieldLogin="email"
        fieldPassword="password"
        fieldConfirmPassword="confirmPassword"
      />
      <div className={classes.LinkWrapper}>
        <Link to="/auth" className={classes.Link}>
          Войти
        </Link>
        <Link to="/auth/society" className={classes.Link}>
          Войти через соц. сеть
        </Link>
      </div>
    </div>
  );
}
