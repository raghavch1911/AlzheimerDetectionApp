import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Removed <React.StrictMode> to prevent double-initialization bugs during development
root.render(
  <App />
);

reportWebVitals();
