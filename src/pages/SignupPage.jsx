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
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      } else if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 6) {
        errors.password = 'Min length 6 symbols';
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords must match';
      }
      return errors;
    },
  });

  return (
    <div className={classes.AuthLayuout}>
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
        <Link to="/auth" className={classes.Link}>
          Зарегистрироваться через соц. сеть
        </Link>
      </div>
    </div>
  );
}
