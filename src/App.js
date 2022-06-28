import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { PubNubProvider } from 'pubnub-react';
import { pubnub } from './config/pubnub.config';
import Router from './Router';

function App() {
  return (
    <PubNubProvider client={pubnub}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router />
        </PersistGate>
      </Provider>
    </PubNubProvider>
  );
}

export default App;
