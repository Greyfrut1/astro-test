import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './services/store';
import './App.scss';
import { LoadingProvider } from './context/loading-context';
import { AliasProvider } from './context/alias';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <LoadingProvider>
        <AliasProvider>
          <App />
        </AliasProvider>
      </LoadingProvider>
    </Provider>
  </React.StrictMode>,
);
