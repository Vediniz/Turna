import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Calendar from './components/Calendar.jsx';
import ScaleForm from './components/ScaleForm.jsx';
import ScaleList from './components/ScaleList.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)