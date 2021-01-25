import React, { useEffect, useState } from "react";
import EmployeeEditForm from "./UserEditForm";
import PageAddressBar from "../PageAddressBar"

function ManagerEditPage({ user }) {
    document.title = "Onboarding: profil użytkownika";
    
    const [singleUser, setSingleUser] = useState({
        id: 0, 
        name: "", 
        last_name: "", 
        email: "", 
        tel: "",
        position: "", 
        department: "", 
        location: "", 
        avatar: "/onboarding/static/images/unknown-profile.jpg"
    });
    
    useEffect(() => {
        user && setSingleUser({
                id: user.id,
                name: user.first_name || "",
                last_name: user.last_name || "", 
                email: user.email || "", 
                tel: user.tel || "",
                position: user.position || "", 
                department: user.department || "", 
                location: user.location || "", 
                avatar: user.avatar || "/onboarding/static/images/unknown-profile.jpg"
            })
    },[user]);

    return (
        <main className="app-main">
            <div className="wrapper">
                <div className="page">
                    <div className="page-inner">
                        <PageAddressBar page="Twój profil" />
                        <div className="page-section">
                            <div className="card card-fluid">
                                <div className="card-header">Twój profil</div>
                                <EmployeeEditForm
                                    user={ singleUser }
                                    enableUploadAvatar={ true }
                                    buttonTitle={ "Zapisz" }
                                    modalTitle={"Edycja danych"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ManagerEditPage;

