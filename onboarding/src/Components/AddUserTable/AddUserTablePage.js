import React, { useState, useRef } from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import AddUserTable from "./AddUserTable";
import LoggedUser from "../hooks/LoggedUser.js";
import { singleCombo } from "../hooks/Packages";
import ModalWarning from "../ModalWarning";


function AddUserTablePage(props) {
    const packageIdRef = useRef(0),
        [confirmationModal, setIdModal ] = useState({id: 0, modal: <></>});

    let loggedUser, packageObj = null;
    if(props.location.state){
        packageIdRef.current = props.location.state.packageId;
        packageObj = singleCombo(packageIdRef.current);

        loggedUser = (props.location.state.loggedUser)?props.location.state.loggedUser:LoggedUser();
    } else
        loggedUser = LoggedUser();

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
        <div className="app">
            <header className="app-header app-header-dark">
                <Navbar loggedUser={ loggedUser } />
            </header>
            <LeftMenu packageId = { packageIdRef.current } loggedUser={ loggedUser } />
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <PageAddressBar page = { "Wyślij pracownikowi" } loggedUser={ loggedUser } />
                            <AddUserTable loggedUser={ loggedUser } packageId={ packageIdRef.current } packageCurrent={ packageObj } showModal={ popUpConfirmationModal } />
                        </div>
                    </div>
                    { confirmationModal.modal }
                </div>
            </main>
        </div>
    )
}
export default AddUserTablePage;

