import React, { useState } from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import AddUserTable from "./AddUserTable";
import { singleCombo } from "../hooks/Packages";
import ModalWarning from "../ModalWarning";
import { useParams } from "react-router-dom";


function AddUserTablePage() {
    document.title = "Onboarding: wyślij pracownikowi";

    const { package_id:packageId } = useParams();
    const [confirmationModal, setIdModal ] = useState({id: 0, modal: <></>});
    let packageObj = singleCombo(packageId);

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
                <Navbar />
            </header>
            <LeftMenu packageId = { packageId }  />
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                      <div className="page-inner">
                        <PageAddressBar page = { `Wyślij katalog ${packageObj ? `"${packageObj.title}"` : ""}` } />
                        <AddUserTable packageId={ packageId } packageCurrent={ packageObj } showModal={ popUpConfirmationModal } />
                        { confirmationModal.modal }
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default AddUserTablePage;

