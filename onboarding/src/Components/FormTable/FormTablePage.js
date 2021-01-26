import React from "react";
import PageAddressBar from "../PageAddressBar";
import FormTable from "./FormTable";

function FormTablePage({ companyId }) {
    return(
        <div className="page-inner">
            <PageAddressBar page={ "Formularze" } />
            <FormTable companyId={ companyId } />
        </div>
    )
}

export default FormTablePage;

