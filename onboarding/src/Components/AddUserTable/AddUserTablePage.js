import React, { useRef } from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import AddUserTable from "./AddUserTable";

function AddUserTablePage(props) {
    const packageIdRef = useRef(0);
    if(props.location.state)
        packageIdRef.current = props.location.state.packageId;

    return(
        <div className="app">
            <header className="app-header app-header-dark">
                <Navbar />
            </header>
            <LeftMenu packageId = { packageIdRef.current } />
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <PageAddressBar page = { "Wyślij pracownikowi" } />
                            <AddUserTable />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default AddUserTablePage;

