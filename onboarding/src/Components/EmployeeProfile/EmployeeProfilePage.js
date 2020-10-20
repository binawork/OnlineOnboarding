import React, { useRef } from "react";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import EmployeeProfileTable from "./EmployeeProfileTable";

function EmployeeProfilePage(props) {
    const packageIdRef = useRef(0);
    const singleUser = {name: "", last_name: "", email: "", tel: "", position: "", department: "", localization: "", sent: "-", finished: "-"};
    let stateExists = false;

    if(props.location.state){
        packageIdRef.current = props.location.state.packageId;
        stateExists = true;
    }

    if(stateExists && props.location.state.user){
        let user = props.location.state.user;
        if(typeof user.first_name === "string")
            singleUser.name = user.first_name;
        if(typeof user.last_name === "string")
            singleUser.last_name = user.last_name;

        if(typeof user.email === "string" && user.email !== "-")
            singleUser.email = user.email;
        if(typeof user.tel === "string")
            singleUser.tel = user.tel;

        if(typeof user.position === "string")
            singleUser.position = user.position;
        if(typeof user.department === "string")
            singleUser.department = user.department;
        if(typeof user.localization === "string")
            singleUser.localization = user.localization;

        if(typeof user.sent === "string")
            singleUser.sent = user.sent;
        if(typeof user.finished === "string")
            singleUser.finished = user.finished;
    }

    return(
        <div className="app">
            <header className="app-header app-header-dark">
                <Navbar />
            </header>
            <LeftMenu packageId = { packageIdRef.current } />
            <main className="app-main">
                <div className="wrapper">
                    <div className="page">
                        <div className="page-inner">
                            <PageAddressBar page = { "Podgląd procesu pracownika" } />
                            <EmployeeProfileTable user={ singleUser } />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default EmployeeProfilePage;

