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
    const employeeId = parseInt(useParams().employee_id);
    const [count, setCount] = useState(0);
    const [singleUser, setSingleUser] = useState({
        avatar: "",
        department: "",
        email: "",
        finished: "",
        first_name: "",
        last_name: "",
        location: "",
        name: "",
        position: "", 
        sent: "", 
        team: "", 
        tel: "",
    });    
    let user;
    let packagesSent = {};

    if(location.state) {
        user = location.state.user;
    } else {
        const { data } = getUserById(employeeId);
        if(data) user = data;
        packagesSent = userWithPackages(employeeId, count);
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
            <PageAddressBar page={ `Proces wdrażania pracownika ${singleUser.name} ${singleUser.last_name}` } previousPages={[ {title: "Lista pracowników", url: "/user_list"} ]} />
            <div className="page-section">
                <EmployeeProfileUser user={ singleUser } />
                <ProcessPreviewTables employeeId={ employeeId } count={ count } setCount={ setCount } />
                {/* <ProcessPreviewTables packageId={ packageIdRef.current } loggedUser={ loggedUser }
                                        employee={ singleUser }
                                        count={ count }
                                        setCount={ setCount } /> */}
            </div>
        </div>
    )
}
export default EmployeeProfilePage;

