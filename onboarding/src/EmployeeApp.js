import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import "./static/css/style.css";

import EmployeeSingleFormPage from "./Components/Employee/EmployeeSingleFormPage";
import EmployeeMainPage from "./Components/Employee/EmployeeMainPage";


function EmployeeApp() {
    return (
        <HashRouter>
            <Route path="/page_fill" component={ EmployeeSingleFormPage } />
            <Route path="/" exact component={ EmployeeMainPage } />
        </HashRouter>
    );
}

export default EmployeeApp;

