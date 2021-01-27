import React, { useState, useRef, useEffect } from "react";
import FormTableAddNew from "./FormTableAddNew";
import PackagePage, { OnePackageEdit, removePage } from "../hooks/PackagePage";
import ModalWarning from "../ModalWarning";
import FormTableRow from "./FormTableRow";


function FormTable({ packageId, loggedUser }) {
    const [countUpdate, setCount] = useState(0);
    const [pageIdModal, setPageIdModal ] = useState({id: 0, modal: <></>});
    const [newRowId, setNewRowId] = useState(null);
    const order = useRef(0);
    // const packageId = sessionStorage.getItem("package_id")
    const { pages, isLoading, error } = PackagePage(countUpdate, packageId);

    useEffect(() => {
      if(pages) {
          const ids = pages.map((element) => element.id);
          const maxId = Math.max(...ids);
          setNewRowId(maxId);
      }
    }, [pages]);

    const updatePackages = function(){
    	setCount(countUpdate + 1);
    }

    // const updateOrder = (nr) => {
    //     if(nr > order.current)
    //         order.current = nr;
    // }

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
        removePage(popUpRemoveConfirmation, id);
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
        <div className="card card-fluid">
          <div className="card-header">Edytuj katalog</div>
          <div className="card-body">
            <OnePackageEdit
              packageId={packageId}
            />
          </div>
        </div>
        <div className="card card-fluid">
          <div className="card-header">Stwórz formularz, który wyślesz do pracownika</div>
          <div className="card-body">
            <small style={{ paddingLeft: "12px" }}>Nazwa formularza</small>
            <FormTableAddNew
              id={packageId}
              handleUpdate={updatePackages}
              getOrder={getOrder}
              loggedUser={loggedUser}
            />
          </div>
        </div>
        <div className="card card-fluid">
          <div className="card-header">Lista formularzy</div>
          <div className="card-body">
          { error && <p>{ error }</p> }
          { isLoading && <p>Ładowanie...</p> }
          { pages && 
            <table className="table table-striped">
               <thead>
                    <tr>
                        <th scope="col" style={{width: "50%"}}>Nazwa formularza</th>
                        {/* <th scope="col" style={{width: "10%"}}>Kolejność</th> */}
                        <th scope="col" style={{width: "25%"}}>Edytowany</th>
                        <th scope="col" style={{width: "15%"}}>Działanie</th>
                    </tr>
                </thead>
              <tbody id="form_table_data_container">
              { pages.map(row => 
                  <FormTableRow
                      key={row.id}
                      packageId={packageId}
                      row={{
                        name: row.title,
                        // order: order,
                        last_edit: row.updated_on,
                        description: row.description,
                        link: row.link,
                        id: row.id,
                      }}
                      handleRemoveAsk={ removeAsk }
                      handleUpdate={updatePackages}
                      lastRow={newRowId === row.id}
                      // loggedUser={loggedUser}
                  />
                )
              }
              </tbody>
            </table>
          }
          </div>
          {pageIdModal.modal}
        </div>
      </div>
    );
}
export default FormTable;

