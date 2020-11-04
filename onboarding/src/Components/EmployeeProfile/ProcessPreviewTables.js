import React, { useState } from "react";
import ImplementationFormsSent from "./ImplementationFormsSent";
import ImplementationFormsToSend from "./ImplementationFormsToSend";
import ModalWarning from "../ModalWarning";

function ProcessPreviewTables(props) {
    const [confirmationModal, setIdModal ] = useState({id: 0, modal: <></>});

    const popUpConfirmationModal = (message) => {
        setIdModal({id: 0,
            modal: <ModalWarning handleAccept={ idle } title={ "Potwierdzenie wysłania" } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />
        });
    }

    const hideModal = function(){
        setIdModal({id: 0, modal: <></>});
    }

    return(
        <>
            <ImplementationFormsSent />
            <ImplementationFormsToSend />
            { confirmationModal.modal }
        </>
    )
}
export default ProcessPreviewTables;

