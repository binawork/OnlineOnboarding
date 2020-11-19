import React, { useState } from "react";
import ImplementationFormsSent from "./ImplementationFormsSent";
import ImplementationFormsToSend from "./ImplementationFormsToSend";
import ModalWarning from "../ModalWarning";

function ProcessPreviewTables(props) {
    const [confirmationModal, setIdModal ] = useState({id: 0, modal: <></>});

    const popUpConfirmationModal = (message) => {
        setIdModal({id: 0,
            modal: <ModalWarning handleAccept={ hideModal } title={ "Potwierdzenie wysłania" } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />
        });
    }

    const hideModal = function(){
        setIdModal({id: 0, modal: <></>});
    }

    return(
        <>
            <ImplementationFormsSent showModal={ popUpConfirmationModal } userId={ props.userId } />
            <ImplementationFormsToSend showModal={ popUpConfirmationModal } userId={ props.userId } />
            { confirmationModal.modal }
        </>
    )
}
export default ProcessPreviewTables;

