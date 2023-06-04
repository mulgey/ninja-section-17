import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthSağlayıcı } from './context/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthSağlayıcı>
      <App />
    </AuthSağlayıcı>
  </React.StrictMode>,
  document.getElementById('root')
);