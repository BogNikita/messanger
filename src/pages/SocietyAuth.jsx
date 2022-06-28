import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchGoogleAuth, fetchGithubAuth } from '../store/action/auth';
import classes from './Page.module.css';

export default function SocietyAuth() {
  const dispatch = useDispatch();
  const googleAuth = () => {
    dispatch(fetchGoogleAuth());
  };
  const githubAuth = () => {
    dispatch(fetchGithubAuth());
  };

  return (
    <div className={classes.AuthLayout}>
      <div className={classes.Society}>
        <div className={classes.Icons} onClick={googleAuth}>
          <i className="fab fa-google"></i>
        </div>
        <div className={classes.Icons} onClick={githubAuth}>
          <i className="fab fa-github"></i>
        </div>
      </div>
      <Link to="/auth" className={classes.Link}>Назад</Link>
    </div>
  );
}
