import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ use 'client' API for React 18
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
