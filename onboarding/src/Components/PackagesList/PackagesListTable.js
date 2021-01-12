import React, { useState/*, useEffect*/ } from "react";
import PackagesAddNew from "./PackagesAddNew";
import Packages, { removeCombo } from "../hooks/Packages";
import LoggedUser from "../hooks/LoggedUser.js";
import ModalWarning from "../ModalWarning";


function PackagesListTable(props) {
    const [countUpdate, update] = useState(0);
    const [packageIdModal, setPackageIdModal ] = useState({id: 0, modal: <></>});
    //let packages = <Packages count = countUpdate />;
    let loggedUser = (props.loggedUser)?props.loggedUser:LoggedUser();

    var updatePackages = function(){
    	update(countUpdate + 1);
        //packages = Packages(countUpdate);
    }

    var removeAsk = (e) => {
        setPackageIdModal({id: e.target.value,
            modal: <ModalWarning handleAccept={ removePackage } handleCancel={ hideModal }
            					title={ "Usunięcie wdrożenia" }
            					message={ "Czy na pewno chcesz usunąć wdrożenie?" }
            					show={ true }
            					id={ e.target.value } />
        });
    };

    const hideModal = function(){
        setPackageIdModal({id: 0, modal: <></>});
    }

    const removePackage = function(id){
        hideModal();
        removeCombo(popUpRemoveConfirmation, id);
    }

    const popUpRemoveConfirmation = (message) => {
        setPackageIdModal({id: 0,
            modal: <ModalWarning handleAccept={ idle } title={ "Usunięcie wdrożenia" } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />
        });
    }

    const idle = () => {
        hideModal();
        update(countUpdate + 1);
    };


    return (
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Dodanie nowego dokumentu
                </div>
                <div className="card-body">
                    <PackagesAddNew handleUpdate = { updatePackages } />
                </div>
            </div>
            <div className="card card-fluid">
                <div className="card-header">
                    Lista Formularzy
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th scope="col" style={{width: "50%"}}>Nazwa</th>{/* sortowanie po * */}
                            <th scope="col" style={{width: "25%"}}>Edytowany</th>
                            <th scope="col" style={{width: "15%"}}>Działanie</th>
                        </tr>
                        </thead>
                        <tbody id="form_table_data_container">
                            <Packages count = { countUpdate } handleRemoveAsk = { removeAsk } loggedUser={ loggedUser } />
                        </tbody>
                    </table>
                </div>

                { packageIdModal.modal }
            </div>
        </div>
    )
}
export default PackagesListTable;

