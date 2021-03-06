import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios'
import './Index.css'
// import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import './Global.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
axios.defaults.baseURL='http://localhost:5000/api/'
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
