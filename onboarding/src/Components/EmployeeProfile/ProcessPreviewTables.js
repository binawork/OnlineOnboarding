import React, { useState } from "react";
import ImplementationFormsSent from "./ImplementationFormsSent";
import ImplementationFormsToSend from "./ImplementationFormsToSend";
import ModalWarning from "../ModalWarning";

function ProcessPreviewTables(props) {
    const [confirmationModal, setIdModal ] = useState({id: 0, modal: <></>});

    const popUpConfirmationModal = (message) => {
        let count = confirmationModal.id;
        setIdModal({id: count,
            modal: <ModalWarning handleAccept={ hideModal } title={ "Potwierdzenie wysłania" } message={ message } id={ count } show={ true } acceptText={ "Ok" } />
        });
    }

    const hideModal = function(id){
        setIdModal({id: id + 1, modal: <></>});
    }

    return(
        <>
            <ImplementationFormsSent packageId={ props.packageId } loggedUser={ props.loggedUser }
                                     employee={ props.employee }
                                     showModal={ popUpConfirmationModal }
                                     count={ confirmationModal.id } />
            <ImplementationFormsToSend showModal={ popUpConfirmationModal } userId={ props.employee.id }  count={ props.count } setCount={ props.setCount } />
            { confirmationModal.modal }
        </>
    )
}
export default ProcessPreviewTables;

