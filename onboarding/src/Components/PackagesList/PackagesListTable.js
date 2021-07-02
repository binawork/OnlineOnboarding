import React, { useEffect, useState } from "react";
import PackagesAddNew from "./PackagesAddNew";
import fetchPackages, { fetchPackagesAndForms, removeCombo } from "../hooks/Packages";
import ModalWarning from "../ModalWarning";
import PackagesRow from "../PackagesList/PackagesRow";

function PackagesListTable({ setPackagesList }) {
    const [count, setCount] = useState(0);
    const [packageIdModal, setPackageIdModal] = useState({id: 0, modal: <></>});
    const [newRowId, setNewRowId] = useState(null);
    const [showAddCatalogueInput, setShowAddCatalogueBox] = useState(false);
 
    const { packages, isLoading, error } = fetchPackages(count);
    const { packagesAndForms } = fetchPackagesAndForms(count);

    useEffect(() => {
        if(packages && packagesAndForms) {
            const ids = packages.map((element) => element.id);
            const maxId = Math.max(...ids);
            setNewRowId(maxId);
            
            packages.forEach(element => {
                const foundPackage = packagesAndForms.find(pack => pack.id === element.id);
                element.pages = foundPackage ? foundPackage.page_set : [];
            })
        }

        packages && setPackagesList(packages.map(element => {
            return { id: element.id, title: element.title };
        }));
    }, [packages, packagesAndForms]);

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

    const packagesRows = packages && packagesAndForms && packages.map(element => (
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
    const popUpAddPackageError = (message) => {
        setPackageIdModal({id: 0,
            modal: <ModalWarning handleAccept={ idle } title={ "Dodanie wdrożenia" } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />
        });
    }

    const idle = () => {
        hideModal();
        setCount(count + 1);
    };

    return (
        <div className="Packages page-section pt-5">
            <button className="Packages__button btn mb-5" onClick={() => setShowAddCatalogueBox(true)}>
                + Dodaj tytuł wdrożenia
            </button>
            { showAddCatalogueInput &&
                <PackagesAddNew 
                    handleUpdate={ updatePackages }
                    setShowAddCatalogueBox={ setShowAddCatalogueBox }
                    popUpAddPackageError={ popUpAddPackageError } />
            }
            <div className="Packages__list card-fluid">
                <h2 className="Packages__header">
                    Lista twoich wdrożeń
                </h2>
                <h3 className="Packages__subheader">
                    { packages && packages.length > 0 ? "Tytuły" : <span>Te pole jest jeszcze puste.<br />Wypełni się one w momencie tworzenia wdrożeń.</span> }
                </h3>
                { error && <p>{ error }</p> }
                { isLoading && <p>Ładowanie...</p> }
                { packages && (
                    <div className="PackagesList__wrapper table-responsive">
                        <ul className="PackagesList table table-striped table-hover">
                                { packagesRows }
                        </ul>
                    </div>
                )}
                { packageIdModal.modal }
            </div>
        </div>
    )
}
export default PackagesListTable;
