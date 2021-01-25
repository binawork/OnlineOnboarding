import React, { useEffect, useState } from "react";
import EmployeeEditForm from "./UserEditForm";
import PageAddressBar from "../PageAddressBar"
import { useLocation } from "react-router-dom";
import { getUserById } from "../hooks/Users";

function EmployeeEditPage() {
    document.title = "Onboarding: profil pracownika";
    const location = useLocation();
    const [singleUser, setSingleUser] = useState({});

    let user;
    if(location.state) {
      user = location.state.user;
    } else {
      const { data } = getUserById(location.pathname.split("/")[2]);
      user = data;
    };
    
    useEffect(() => {
        location.state && user && setSingleUser(user)
        !location.state && user && setSingleUser({
            ...user,
            name: user.first_name || "",
            tel: user.phone_number || "",
            position: user.job_position || "", 
            department: user.team || "", 
            })
    },[user]);

    return (
        <main className="app-main">
            <div className="wrapper">
                <div className="page">
                    <div className="page-inner">
                        <PageAddressBar page="Edytuj pracownika" />
                        <div className="page-section">
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
                    </div>
                </div>
            </div>
        </main>
    );
}

export default EmployeeEditPage;

