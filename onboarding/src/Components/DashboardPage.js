import React from "react";

import "../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";

import Navbar from "./Navbar";
import LeftMenu from "./LeftMenu";
import PageAddressBar from "./PageAddressBar"

function DashboardPage() {


    return(
        <div className="app">
            <header className="app-header app-header-dark">
                <Navbar /> {/* placeholder */}
            </header>
            <LeftMenu /> {/* placeholder */}
            <main className="app-main">
                <div className="wrapper"><div className="page">
                    <div className="page-inner">
                        <PageAddressBar page = { "Dashboard" } /> {/* placeholder */}

                        <div className="page-section"> {/* placeholder */}
                            <div className="card card-fluid">
                                <div className="card-header">
                                    Dashboard
                                </div>
                                <div className="card-body">
                                    Lorem ipsum
                                </div>
                            </div>
                        </div>

                    </div>
                </div></div>
            </main>
        </div>
    )
}

export default DashboardPage;

