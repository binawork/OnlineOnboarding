import React, { useRef } from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import FormTable from "./FormTable";
import LoggedUser from "../hooks/LoggedUser.js";
//import FormPackageEdit from "./FormPackageEdit";

function FormTablePage(props) {
    const packageIdRef = useRef(0);
    let loggedUser;
    if(props.location.state){
        packageIdRef.current = props.location.state.packageId;
        loggedUser = (props.location.state.loggedUser)?props.location.state.loggedUser:LoggedUser();
    } else
        loggedUser = LoggedUser();

    return(
        <div className="app">
            <header className="app-header app-header-dark">
                <Navbar loggedUser={ loggedUser } />
            </header>
            <LeftMenu packageId = { packageIdRef.current } loggedUser={ loggedUser } />
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <PageAddressBar page = { "Formularze" } loggedUser={ loggedUser } />
                            <FormTable packageId = { packageIdRef.current } loggedUser={ loggedUser } />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default FormTablePage;

