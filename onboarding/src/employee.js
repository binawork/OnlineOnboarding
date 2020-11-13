import React from 'react';
import ReactDOM from 'react-dom';
import EmployeeApp from './EmployeeApp';
import "@fortawesome/fontawesome-free/js/all";

//import "./static/looper/vendor/bootstrap/css/bootstrap.min.css";
//import 'jquery/dist/jquery.min.js';
//import 'bootstrap/dist/js/bootstrap.min.js';

ReactDOM.render(
  <React.StrictMode>
    <EmployeeApp />
  </React.StrictMode>,
  document.getElementById('root')
);
