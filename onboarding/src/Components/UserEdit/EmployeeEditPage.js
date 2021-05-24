import React, { useEffect, useState } from "react";
import UserEditForm from "./UserEditForm";
import PageAddressBar from "../PageAddressBar"
import { useLocation, useParams } from "react-router-dom";
import { getUserById } from "../hooks/Users";
import "../../static/css/UserAccount.scss";

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
        if(user){
            location.state ? setSingleUser(user) : setSingleUser({
                ...user,
                id: employee_id,
                tel: user.phone_number || "",
                position: user.job_position || "", 
                department: user.team || "", 
            });
        }
    },[user]);

    return (
        <div className="page-inner">
            <PageAddressBar page="Edytuj pracownika" />
            <UserEditForm
                user={ singleUser }
                enableUploadAvatar={ false }
                buttonTitle={ "Zapisz" }
                modalTitle={"Edycja danych pracownika"}
            />
        </div>
    );
}

export default EmployeeEditPage;

