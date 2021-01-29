import React, { useState } from "react";
import PageAddressBar from "../PageAddressBar";
import FormTable from "./FormTable";

function FormTablePage({ companyId }) {
    const [formTitle, setFormTitle] = useState("");

    return(
        <div className="page-inner">
            <PageAddressBar 
                page={ formTitle || "Formularze" }
                previousPages={[ {title: "Twoje wdrożenia", url: "/packages"} ]}
            />
            <FormTable companyId={ companyId } setFormTitle={ setFormTitle } />
        </div>
    )
}

export default FormTablePage;

