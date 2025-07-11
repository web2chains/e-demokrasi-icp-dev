import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional (HMR)
if (import.meta.hot) {
  import.meta.hot.accept();
}
