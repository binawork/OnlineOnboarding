import React from 'react';
//import "../static/css/style.css";
import { HashRouter, Route } from 'react-router-dom';

//import Navbar from "./Components/Navbar";
//import UserListSearch from "./Components/UserListSearch";
//import UserListRow from "../Components/UsersList/UserListRow";
import DashboardPage from "./Components/Dashboard/DashboardPage";
import UserListPage from "./Components/UsersList/UserListPage";
import FormsEditPage from "./Components/FormsEdit/FormsEditPage";
import FormTablePage from "./Components/FormTable/FormTablePage";
import AddUserTablePage from "./Components/AddUserTable/AddUserTablePage";
import UserManagerProfilePage from "./Components/EmployeeEdit/UserManagerProfilePage";
import PackagesListPage from "./Components/PackagesList/PackagesListPage";
import QAPage from "./Components/QA/QAPage";

import FormsEmployeePage from "./Components/FormsEmployeePage";
import FormsManagerCheckPage from "./Components/FormsManagerCheckPage";// where manager checks how form was filled;
import EmployeeProfilePage from "./Components/EmployeeProfile/EmployeeProfilePage";
import EmployeeFormsListPage from "./Components/EmployeeFormsList/EmployeeFormsListPage";


function App() {
    return (
        <HashRouter>
            <Route path="/profile/manager" component={ UserManagerProfilePage } />
            <Route path="/employee_profile" component={ EmployeeProfilePage } />
            <Route path="/add_user" component={ UserManagerProfilePage } />
            <Route path="/employe_page_fill" component={ FormsEmployeePage } />
            <Route path="/employe_forms_list" component={ EmployeeFormsListPage } />
            <Route path="/form_edit" component={ FormsEditPage } />
            <Route path="/packages" component={ PackagesListPage } />
            {/* <Route path="/package_page" component={ FormTablePage } /> */}
            <Route path="/package_page/:package_id" component={ FormTablePage } />
            <Route path="/q_and_a" component={ QAPage } />
            <Route path="/user_list" component={ UserListPage } />
            <Route path="/form_list" component={ AddUserTablePage } />
            <Route path="/" exact component={ DashboardPage } />
        </HashRouter>
    );
}

export default App;

