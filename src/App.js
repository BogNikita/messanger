import React from 'react';
import { Provider } from 'react-redux';
import SignupPage from './pages/SignupPage';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <SignupPage />
    </Provider>
  );
}

export default App;
