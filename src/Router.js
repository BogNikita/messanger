import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import MainPage from './pages/MainPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import SocietyAuth from './pages/SocietyAuth';

export default function Router() {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/:chatId/:status">
            <MainPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth">
            <SigninPage />
          </Route>
          <Route exact path="/auth/signup">
            <SignupPage />
          </Route>
          <Route exact path="/auth/society">
            <SocietyAuth />
          </Route>
          <Route exact path="/auth/forgot">
            <ForgotPassword />
          </Route>
          <Redirect to="/auth" />
        </Switch>
      </BrowserRouter>
    );
  }
}
