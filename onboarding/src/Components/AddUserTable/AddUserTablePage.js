import React, { useState, useRef } from "react";
import PageAddressBar from "../PageAddressBar";
import AddUserTable from "./AddUserTable";
import { singleCombo } from "../hooks/Packages";
import ModalWarning from "../ModalWarning";


function AddUserTablePage(props) {
    const packageIdRef = useRef(0),
        [confirmationModal, setIdModal ] = useState({id: 0, modal: <></>});

    let packageObj = null;
    if(props.location.state){
        packageIdRef.current = props.location.state.packageId;
        packageObj = singleCombo(packageIdRef.current);
    };

    document.title = "Onboarding: wyślij pracownikowi";


    const popUpConfirmationModal = (message) => {
        setIdModal({id: 0,
            modal: <ModalWarning handleAccept={ hideModal } title={ "Potwierdzenie wysłania" } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />
        });
    };

    const hideModal = function(id){
        setIdModal({id: 0, modal: <></>});
    };


    return(
        <main className="app-main">
            <div className="wrapper">
                <div className="page">
                    <div className="page-inner">
                        <PageAddressBar page = { "Wyślij pracownikowi" } />
                        <AddUserTable loggedUserId={ props.loggedUserId } packageId={ packageIdRef.current } packageCurrent={ packageObj } showModal={ popUpConfirmationModal } />
                    </div>
                </div>
                { confirmationModal.modal }
            </div>
        </main>
    )
}
export default AddUserTablePage;

