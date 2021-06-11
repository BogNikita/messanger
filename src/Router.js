import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';

export default function Router() {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route
            exact
            path="/:status/:chatId"
            render={(obj) => <MainPage status={obj.match.params.status} chatId={obj.match.params.chatId} />}
          />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth">
            <SignupPage />
          </Route>
          <Redirect to="/auth" />
        </Switch>
      </BrowserRouter>
    );
  }
}
