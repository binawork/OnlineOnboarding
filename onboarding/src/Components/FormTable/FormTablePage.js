import React, { useRef } from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import FormTable from "./FormTable";
//import FormPackageEdit from "./FormPackageEdit";

function FormTablePage(props) {
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
                            <PageAddressBar page = { "Formularze" } />
                            <FormTable packageId = { packageIdRef.current } />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default FormTablePage;
