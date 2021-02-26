import React, { useState } from "react";
import PageAddressBar from "../PageAddressBar";
import FormTable from "./FormTable";

function FormTablePage({ companyId, handleEditTitle }) {
    const [packageTitle, setPackageTitleInAddressBar] = useState("");

    return(
        <div className="page-inner">
            <PageAddressBar 
                page={ `Katalog: ${packageTitle || ""}`}
                previousPages={[ {title: "Twoje wdrożenia", url: "/packages"} ]}
            />
            <FormTable companyId={ companyId } setPackageTitleInAddressBar={ setPackageTitleInAddressBar } handleEditTitle={ handleEditTitle } />
        </div>
    )
}

export default FormTablePage;

