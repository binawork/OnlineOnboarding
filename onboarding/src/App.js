import React from 'react';
import "../static/css/styles.css";
import { HashRouter, Route } from 'react-router-dom';

//import Navbar from "./Components/Navbar";
//import UserListSearch from "./Components/UserListSearch";
//import UserListRow from "../Components/UsersList/UserListRow";
import DashboardPage from "./Components/DashboardPage";
import FormListPage from "./Components/FormList/FormListPage";

function App() {
    return (
        <HashRouter>
            <Route path="/packages" component={ FormListPage } />

            <Route path="/" exact component={ DashboardPage } />
        </HashRouter>
    );
}

export default App;

