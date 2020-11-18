import React from 'react';
//import "../static/css/style.css";
import { HashRouter, Route } from 'react-router-dom';

import FormsEmployeePage from "./Components/Employee/FormsEmployeePage";
import EmployeeFormsListPage from "./Components/Employee/EmployeeFormsList/EmployeeFormsListPage";


function EmployeeApp() {
    return (
        <HashRouter>
            <Route path="/page_fill" component={ FormsEmployeePage } />
            <Route path="/" exact component={ EmployeeFormsListPage } />
        </HashRouter>
    );
}

export default EmployeeApp;

