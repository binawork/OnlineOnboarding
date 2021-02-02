import React, { useEffect, useState } from "react";
import PackagesAddNew from "./PackagesAddNew";
import fetchPackages, { fetchPackagesAndForms, removeCombo } from "../hooks/Packages";
import ModalWarning from "../ModalWarning";
import PackagesRow from "../PackagesList/PackagesRow";

function PackagesListTable() {
    const [count, setCount] = useState(0);
    const [packageIdModal, setPackageIdModal ] = useState({id: 0, modal: <></>});
    const [newRowId, setNewRowId] = useState(null);
 
    const { packages, isLoading, error } = fetchPackages(count);
    const { packagesAndPages } = fetchPackagesAndForms(count);

    useEffect(() => {
        if(packages && packagesAndPages) {
            const ids = packages.map((element) => element.id);
            const maxId = Math.max(...ids);
            setNewRowId(maxId);
            
            packages.forEach(element => {
                const foundPackage = packagesAndPages.find(pack => pack.id === element.id);
                element.pages = foundPackage ? foundPackage.page_set : [];
            })
        }
    }, [packages, packagesAndPages]);

    const updatePackages = function(){
    	setCount(count + 1);
    }

    const removeAsk = (e) => {
        setPackageIdModal({id: e.target.value,
            modal: <ModalWarning handleAccept={ removePackage } handleCancel={ hideModal }
            					title={ "Usunięcie wdrożenia" }
            					message={ "Czy na pewno chcesz usunąć wdrożenie?" }
            					show={ true }
            					id={ e.target.value } />
        });
    };

    const packagesRows = packages && packagesAndPages && packages.map(element => (
        <PackagesRow
            key={ element.id }
            row={{
                id: element.id,
                name: element.title,
                last_edit: element.updated_on,
                created: element.created_on,
                description: element.description,
                pages: element.pages || []
            }}
            removeAsk={ removeAsk }
            lastRow={ newRowId === element.id }
        />
    ))

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
        setCount(count + 1);
    };

    return (
        <div className="page-section">
            <div className="card card-fluid">
                <div className="card-header">
                    Dodaj nowy katalog wdrożeń (np. BHP, Szkolenia produktowe, Osoby kluczowe etc.)
                </div>
                <div className="card-body">
                    <PackagesAddNew handleUpdate = { updatePackages } />
                </div>
            </div>
            <div className="card card-fluid">
                <div className="card-header">
                    Lista twoich katalogów
                </div>
                <div className="card-body">
                    { error && <p>{ error }</p> }
                    { isLoading && <p>Ładowanie...</p> }
                    { packages && (
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Nazwa</th>{/* sortowanie po * */}
                                <th scope="col" style={{width: "25%"}}>Edytowany</th>
                                <th scope="col" style={{width: "15%"}}>Działanie</th>
                            </tr>
                            </thead>
                            <tbody id="form_table_data_container">
                                { packagesRows }
                            </tbody>
                        </table>
                    )}
                </div>
                { packageIdModal.modal }
            </div>
        </div>
    )
}
export default PackagesListTable;

