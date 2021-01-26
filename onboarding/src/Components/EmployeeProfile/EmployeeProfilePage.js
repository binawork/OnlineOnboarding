import React, { useEffect, useState } from "react";
import PageAddressBar from "../PageAddressBar";
import EmployeeProfileUser from "./EmployeeProfileUser";
import ProcessPreviewTables from "./ProcessPreviewTables";
import { useLocation, useParams } from "react-router-dom";
import { getUserById } from "../hooks/Users";
import { userWithPackages } from "../hooks/Packages";


function EmployeeProfilePage() {
    document.title = "Onboarding: podgląd procesu pracownika";
    const location = useLocation();
    let { employee_id:userId } = useParams();
    const [count, setCount] = useState(0);
    const [singleUser, setSingleUser] = useState({});    

    let user;
    let packagesSent = {};

    if(location.state) {
        user = location.state.user;
    } else {
        const { data } = getUserById(userId);
        user = data;
        packagesSent = userWithPackages(userId, count);
    };

    useEffect(() => {
        !location.state && packagesSent && setSingleUser({
            ...singleUser,
            sent: packagesSent.packageIds.length,
            finished: 0
        });
    }, [packagesSent])

    useEffect(() => {
        location.state && user && setSingleUser(user);
        !location.state && user && setSingleUser({
            ...singleUser,
                  ...user,
                  name: user.first_name || "",
                  tel: user.phone_number || "",
                  position: user.job_position || "", 
                  department: user.team || "", 
        });
      },[user]);

    return(
        <div className="page-inner">
            <PageAddressBar page = { "Podgląd procesu pracownika" } />
            <div className="page-section">
                <EmployeeProfileUser user={ singleUser } />
                <ProcessPreviewTables userId={ userId } count={ count } setCount={ setCount } />
            </div>
        </div>
    )
}
export default EmployeeProfilePage;

