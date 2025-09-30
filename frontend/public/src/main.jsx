import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Geralmente existe um componente 'App'
import './index.css'
import Calendar from './components/Calendar.jsx'
import ScaleForm from './components/ScaleForm.jsx'
import ScaleList from './components/ScaleList.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)