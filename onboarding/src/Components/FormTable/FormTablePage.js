import React from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import FormTable from "./FormTable";
//import FormPackageEdit from "./FormPackageEdit";

function FormTablePage(props) {
	let packageId = 0;
	if(props.location.state)
		packageId = props.location.state.packageId;

    return(
        <div className="app">
            <header className="app-header app-header-dark">
                <Navbar />
            </header>
            <LeftMenu packageId = { packageId } />
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <PageAddressBar page = { "Formularze" } />
                            <FormTable packageId = { packageId } />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default FormTablePage;
