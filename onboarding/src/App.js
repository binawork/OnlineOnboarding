import React, { useEffect } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import "./static/css/style.css";

//import Navbar from "./Components/Navbar";
//import UserListSearch from "./Components/UserListSearch";
//import UserListRow from "../Components/UsersList/UserListRow";
import LoggedUser from "./Components/hooks/LoggedUser.js";
import FormsManagerCheckPage from "./Components/FormsManagerCheckPage";// where manager checks how form was filled;
import DashboardPage from "./Components/Dashboard/DashboardPage";
import UserListPage from "./Components/UsersList/UserListPage";
import FormsEditPage from "./Components/FormsEdit/FormsEditPage";
import FormTablePage from "./Components/FormTable/FormTablePage";
import AddUserTablePage from "./Components/AddUserTable/AddUserTablePage";
import UserManagerProfilePage from "./Components/EmployeeEdit/UserManagerProfilePage";
import PackagesListPage from "./Components/PackagesList/PackagesListPage";
import QnAPage from "./Components/QnA/QnAPage";
import EmployeeProfilePage from "./Components/EmployeeProfile/EmployeeProfilePage";
import CompanyInfoPage from "./Components/CompanyInfo/CompanyInfoPage";
import EmployeeAnswersViewPage from "./Components/EmployeeAnswersView/EmployeeAnswersViewPage";


function App() {
    const loggedUser = LoggedUser();

    useEffect(() => {
        if(loggedUser.id > 0) sessionStorage.setItem("logged_user", JSON.stringify(loggedUser));
    }, [loggedUser]);

    return (
        <HashRouter>
            <Route path="/company" component={ CompanyInfoPage } />
            <Route path="/profile/manager" component={ UserManagerProfilePage } />
            <Route path="/employee_profile" component={ EmployeeProfilePage } />
            <Route path="/employee_answers/:page_id" component={ EmployeeAnswersViewPage } />
            <Route path="/add_user" component={ UserManagerProfilePage } />
            <Route path="/form_edit/:form_id" component={ FormsEditPage } />
            <Route path="/packages" component={ PackagesListPage } />
            <Route path="/package_page/:package_id" component={ FormTablePage } />
            <Route path="/q_and_a" component={ QnAPage } />
            <Route path="/user_list" component={ UserListPage } />
            <Route path="/users_pages" component={ AddUserTablePage } />
            <Route path="/" exact component={ DashboardPage } />
        </HashRouter>
    );
}

export default App;

