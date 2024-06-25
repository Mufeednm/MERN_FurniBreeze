import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "./index.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from './Globalcontext/UserContextprovider'

ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
   <UserContextProvider>
     
  <ToastContainer/>


    <App />
   </UserContextProvider>

  </BrowserRouter>

)
