import React from "react";
import PageAddressBar from "../PageAddressBar";
import FormTable from "./FormTable";

function FormTablePage({ loggedUser }) {
    return(
        <main className="app-main">
            <div className="wrapper">
                <div className="page">
                    <div className="page-inner">
                        <PageAddressBar page={ "Formularze" } loggedUser={ loggedUser } />
                        <FormTable loggedUser={ loggedUser } />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default FormTablePage;

