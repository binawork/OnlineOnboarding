import React, { useEffect, useState } from "react";
import EmployeeEditForm from "./UserEditForm";
import PageAddressBar from "../PageAddressBar"
import { useLocation, useParams } from "react-router-dom";
import { getUserById } from "../hooks/Users";

function EmployeeEditPage() {
    document.title = "Onboarding: profil pracownika";
    const location = useLocation();
    const [singleUser, setSingleUser] = useState({});
    const { employee_id } = useParams();

    let user;
    if(location.state) {
      user = location.state.user;
    } else {
      const { data } = getUserById(employee_id);
      user = data;
    };
    
    useEffect(() => {
        location.state && user && setSingleUser(user)
        !location.state && user && setSingleUser({
            ...user,
            tel: user.phone_number || "",
            position: user.job_position || "", 
            department: user.team || "", 
        });
    },[user]);

    return (
        <div className="page-inner">
            <PageAddressBar page="Edytuj pracownika" />
            <div className="card card-fluid">
                <div className="card-header">Edytuj pracownika</div>
                <EmployeeEditForm
                    user={ singleUser }
                    enableUploadAvatar={ false }
                    buttonTitle={ "Zapisz" }
                    modalTitle={"Edycja danych pracownika"}
                />
            </div>
        </div>
    );
}

export default EmployeeEditPage;

