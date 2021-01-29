import React, { useState, useRef, useEffect } from "react";
import FormTableAddNew from "./FormTableAddNew";
import { fetchOnePackageAndForms, removeForm } from "../hooks/PackagePage";
import ModalWarning from "../ModalWarning";
import FormPackageEdit from "./FormPackageEdit";
import FormTableRow from "./FormTableRow";
import { useLocation, useParams } from "react-router-dom";


function FormTable({ companyId, setFormTitle }) {
    const location = useLocation();
    const [countUpdate, setCount] = useState(0);
    const [pageIdModal, setPageIdModal ] = useState({id: 0, modal: <></>});
    // newRowId is used to style only the newest row
    const [newRowId, setNewRowId] = useState(null);
    const order = useRef(0);
    const { package_id:packageId } = useParams();
    const { packageAndForms, isLoading, error } = fetchOnePackageAndForms(packageId, countUpdate);

    let pages;
    let packageData;
    let loading = true;
    let errorMessage;

    if(location.state) {
      loading = false;
      packageData = location.state.packageData;
      pages = location.state.pages;
    } 
    if(!location.state || countUpdate > 0) {
      if(packageAndForms) {
        packageData = packageAndForms;
        pages = packageAndForms?.page_set.sort((a,b) =>  b.id - a.id);
        errorMessage = error;
        loading = isLoading;
      };
    };

    useEffect(() => {
      if(pages) {
          const ids = pages.map((element) => element.id);
          const maxId = Math.max(...ids);
          setNewRowId(maxId);
      }
    }, [pages]);
    useEffect(() => {
      packageAndForms && setFormTitle(packageAndForms.title);
    })

    const updatePackages = function(){
    	setCount(countUpdate + 1);
    }

    const getOrder = () => order.current;

    const hideModal = function(){
        setPageIdModal({id: 0, modal: <></>});
    }
    const idle = () => {
        hideModal();
        setCount(countUpdate + 1);
    };
    const popUpRemoveConfirmation = (message) => {
        setPageIdModal({
        id: 0,
        modal: (
          <ModalWarning
            handleAccept={idle}
            title={"Usunięcie formularza"}
            message={message}
            id={0}
            show={true}
            acceptText={"Ok"}
          />
        ),
      });
    };
    const removePackage = function(id){
        hideModal();
        removeForm(popUpRemoveConfirmation, id);
    }
    const removeAsk = (e) => {
        setPageIdModal({
          id: e.target.value,
          modal: (
            <ModalWarning
              handleAccept={removePackage}
              handleCancel={hideModal}
              title={"Usunięcie formularza"}
              message={"Czy na pewno chcesz usunąć formularz?"}
              show={true}
              id={e.target.value}
            />
          ),
        });
    };

    return (
      <div className="page-section">
        { loading && <p>Ładowanie...</p> }
        { errorMessage && <p>{ errorMessage }</p> }
        { packageData && (
          <>
          <div className="card card-fluid">
            <div className="card-header">Edytuj katalog</div>
            <div className="card-body">
              <FormPackageEdit 
                title={ packageData?.title }
                description={ packageData?.description }
                packageId={ packageId }
              />
            </div>
          </div>
          <div className="card card-fluid">
            <div className="card-header">Stwórz formularz, który wyślesz do pracownika</div>
            <div className="card-body">
              <small style={{ paddingLeft: "12px" }}>Nazwa formularza</small>
              <FormTableAddNew
                id={ packageId }
                handleUpdate={ updatePackages }
                getOrder={ getOrder }
                companyId={ companyId }
              />
            </div>
          </div>
          <div className="card card-fluid">
            <div className="card-header">Lista formularzy</div>
            <div className="card-body">
            { pages && 
              <table className="table table-striped">
                <thead>
                      <tr>
                          <th scope="col" style={{ width: "50%" }}>Nazwa formularza</th>
                          <th scope="col" style={{ width: "25%" }}>Edytowany</th>
                          <th scope="col" style={{ width: "15%" }}>Działanie</th>
                      </tr>
                  </thead>
                <tbody id="form_table_data_container">
                { pages.map(row => 
                    <FormTableRow
                        key={ row.id }
                        packageId={ packageId }
                        packageTitle={packageAndForms.title}
                        row={{
                          name: row.title,
                          last_edit: row.updated_on,
                          description: row.description,
                          link: row.link,
                          id: row.id,
                        }}
                        handleRemoveAsk={ removeAsk }
                        handleUpdate={ updatePackages }
                        lastRow={ newRowId === row.id }
                    />
                  )
                }
                </tbody>
              </table>
            }
            </div>
            {pageIdModal.modal}
          </div>
          </>
        )}
      </div>
    );
}
export default FormTable;

