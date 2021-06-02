import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { fetchRequest } from '../store/action/auth';
import SignupComponent from '../components/Signup/SignupComponent';
import classes from './Page.module.css';

export default function SignupPage() {
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
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      } else if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 6) {
        errors.password = 'Min length 6 symbols';
      }
      return errors;
    },
  });

  return (
    <div className={classes.SignupLayuout}>
      <h1>
        Авторизация <i className="fab fa-accessible-icon"></i>
      </h1>
      <SignupComponent {...formik} {...state} fieldLogin="email" fieldPassword="password" />
    </div>
  );
}
