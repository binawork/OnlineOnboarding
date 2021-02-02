import React, { useEffect, useState } from "react";
import UserEditForm from "./UserEditForm";
import PageAddressBar from "../PageAddressBar"

function ManagerEditPage({ user }) {
    document.title = "Onboarding: profil użytkownika";
    
    const [singleUser, setSingleUser] = useState({
        id: 0, 
        first_name: "", 
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
                first_name: user.first_name || "",
                last_name: user.last_name || "", 
                email: user.email || "", 
                tel: user.phone_number || "",
                position: user.job_position || "", 
                department: user.team || "", 
                location: user.location || "", 
                avatar: user.avatar || "/onboarding/static/images/unknown-profile.jpg"
            })
    },[user]);

    return (
        <div className="page-inner">
            <PageAddressBar page="Twój profil" />
            <div className="card card-fluid">
                <div className="card-header">Twój profil</div>
                <UserEditForm
                    loggedUser={ user }
                    user={ singleUser }
                    enableUploadAvatar={ true }
                    buttonTitle={ "Zapisz" }
                    modalTitle={"Edycja danych"}
                />
            </div>
        </div>
    );
}

export default ManagerEditPage;

