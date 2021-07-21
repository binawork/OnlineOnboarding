import React from "react";
import UserEditForm from "./UserEditForm";
import PageAddressBar from "../PageAddressBar";

function AddEmployeePage() {
    document.title = "Onboarding: dodaj pracownika";
    
    const singleUser = {
        id: 0, 
        name: "", 
        last_name: "", 
        email: "", 
        tel: "",
        position: "", 
        department: "", 
        location: "", 
        avatar: ""
        // avatar: "/onboarding/static/images/unknown-profile.jpg"
    };

    return (
        <div className="page-inner">
            <PageAddressBar page="Dodaj pracownika" />
            <UserEditForm
                user={ singleUser }
                enableUploadAvatar={ false }
                buttonTitle={ "+ Dodaj do listy pracowników" }
                modalTitle={"Dodanie pracownika"}
            />
        </div>
    );
}

export default AddEmployeePage;
