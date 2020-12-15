import React, { useState, useRef } from "react";
import FormTableAddNew from "./FormTableAddNew";
import PackagePage, { OnePackageEdit, removePage } from "../hooks/PackagePage";
import ModalWarning from "../ModalWarning";


function FormTable(props) {
    const [countUpdate, update] = useState(0),
    order = useRef(0);
    const [pageIdModal, setPageIdModal ] = useState({id: 0, modal: <></>});

    let loggedUser = {
      id: 0,
      email: "",
      first_name: "",
      last_name: "",
      phone_number: "",
      location: "",
      team: "",
      job_position: "",
      last_login: "",
      avatar: "",
    };
    if(props.loggedUser)
        loggedUser = props.loggedUser;
    //let packages = <Packages count = countUpdate />;

    var updatePackages = function(){
    	update(countUpdate + 1);
        //packages = Packages(countUpdate);
    }

    const updateOrder = (nr) => {
        if(nr > order.current)
            order.current = nr;
    }

    const getOrder = () => order.current;

    const hideModal = function(){
        setPageIdModal({id: 0, modal: <></>});
    }
    const idle = () => {
        hideModal();
        update(countUpdate + 1);
    };
    const popUpRemoveConfirmation = (message) => {
        setPageIdModal({
        id: 0,
        modal: (
          <ModalWarning
            handleAccept={idle}
            title={"Usunięcie strony"}
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
              title={"Usunięcie strony"}
              message={"Czy na pewno chcesz usunąć stronę?"}
              show={true}
              id={e.target.value}
            />
          ),
        });
    };

    return (
      <div className="page-section">
        <div className="card card-fluid">
          <div className="card-header">Edytuj formularz</div>
          <div className="card-body">
            <OnePackageEdit
              packageId={props.packageId}
              loggedUser={loggedUser}
            />
          </div>
        </div>
        <div className="card card-fluid">
          <div className="card-header">Stwórz strone</div>
          <div className="card-body">
            <FormTableAddNew
              id={props.packageId}
              handleUpdate={updatePackages}
              getOrder={getOrder}
              loggedUser={loggedUser}
            />
          </div>
        </div>
        <div className="card card-fluid">
          <div className="card-header">Lista Stron</div>
          <div className="card-body">
            <table className="table table-striped">
               <thead>
                    <tr>
                        <th scope="col" style={{width: "50%"}}>Nazwa strony</th>
                        <th scope="col" style={{width: "10%"}}>Kolejność</th>
                        <th scope="col" style={{width: "25%"}}>Edytowany</th>
                        <th scope="col" style={{width: "15%"}}>Działanie</th>
                    </tr>
                </thead>
              <tbody id="form_table_data_container">
                <PackagePage
                  id={props.packageId}
                  count={countUpdate}
                  handleUpdate={updatePackages}
                  updateOrder={updateOrder}
                  handleRemoveAsk={removeAsk}
                  loggedUser={loggedUser}
                />
              </tbody>
            </table>
          </div>
          {pageIdModal.modal}
        </div>
      </div>
    );
}
export default FormTable;

