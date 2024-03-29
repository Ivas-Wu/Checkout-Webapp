import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-wsk1guie.us.auth0.com"
      clientId="NHrIFafN5WBtQ8SIWhk0xIMlrrKV24va"
      redirectUri="http://localhost:3005/home"
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);
