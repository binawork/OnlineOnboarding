import React from 'react';
import "../static/css/styles.css";
import { HashRouter, Route } from 'react-router-dom';

//import Navbar from "./Components/Navbar";
//import UserListSearch from "./Components/UserListSearch";
//import UserListRow from "../Components/UsersList/UserListRow";
import DashboardPage from "./Components/DashboardPage";
import UserListPage from "./Components/UsersList/UserListPage";
import FormsEditPage from "./Components/FormsEdit/FormsEditPage";
import FormTablePage from "./Components/FormTable/FormTablePage";
import AddUserTablePage from "./Components/AddUserTable/AddUserTablePage";
import UserManagerProfilePage from "./Components/UserManagerProfilePage";
import FormListPage from "./Components/FormList/FormListPage";

import FormsEmployeePage from "./Components/FormsEmployeePage";
import FormsManagerCheckPage from "./Components/FormsManagerCheckPage";// where manager checks how form was filled;
import EmployeProfilePage from "./Components/EmployeProfile/EmployeProfilePage";
import EmployePageFillCopyPage from "./Components/EmployePageFillCopy/EmployePageFillCopyPage";


function App() {
    return (
        <HashRouter>
            <Route path="/profile/manager" component={ UserManagerProfilePage } />
            <Route path="/profile/employee" component={ EmployeProfilePage } />
            <Route path="/add_user" component={ UserManagerProfilePage } />
            <Route path="/employe_page_fill" component={ FormsEmployeePage } />
            <Route path="/employe_forms_list" component={ EmployePageFillCopyPage } />
            <Route path="/form_edit" component={ FormsEditPage } />
            <Route path="/packages" component={ FormListPage } />
            <Route path="/package_page" component={ FormTablePage } />
            <Route path="/user_list" component={ UserListPage } />
            <Route path="/form_list" component={ AddUserTablePage } />
            <Route path="/" exact component={ DashboardPage } />
        </HashRouter>
    );
}

export default App;

