import React, { useEffect, useState } from "react";
import PageAddressBar from "../PageAddressBar";
import EmployeeProfileUser from "./EmployeeProfileUser";
import ProcessPreviewTables from "./ProcessPreviewTables";
import { useLocation, useParams } from "react-router-dom";
import { getUserById } from "../hooks/Users";
// import { userWithPackages } from "../hooks/Packages";
import EmployeeForms/*, { getProgress }*/ from "../hooks/EmployeeForms";


function EmployeeProfilePage() {
    document.title = "Onboarding: podgląd procesu pracownika";

    const location = useLocation();
    const employeeId = parseInt(useParams().employee_id);
    const [count, setCount] = useState(0);
    const [answersPage, setAnswersPage] = useState(null);
    //const [formTable, setSentPackages] = useState({msg: "Ładowanie ..."});
    const [errorOfPackages, setError] = useState(false);
    const [loadingPackages, setLoadingPackages] = useState(true);
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
    const groupedPackages = EmployeeForms(employeeId, count, setError, setLoadingPackages);
    let user;
    // let packagesSent = {};

    if(location.state) {
        user = location.state.user;
    } else {
        const { data } = getUserById(employeeId);
        if(data) user = data;
        // packagesSent = userWithPackages(employeeId, count);
    }


    useEffect(() => {
        if(user){
            location.state ? setSingleUser(user) : setSingleUser({
                ...singleUser,
                ...user,
                name: user.first_name || "",
                tel: user.phone_number || "",
                position: user.job_position || "", 
                department: user.team || "", 
            });
        }
    }, [user]);

    const updateSentAndFinished = function(sent, finished){
        setSingleUser({...singleUser, sent: sent, finished: finished});
    };

    /*useEffect(() => {
        if(groupedPackages.hasOwnProperty('sent') && groupedPackages.sent.length > 0){console.log("  here EPP");
            let abortFun = getProgress(employeeId, progressCallback);
            return abortFun;
        }
    }, [groupedPackages]);*/

    const goBackToMainProfilePage = (e) => {
        e.preventDefault();
        setAnswersPage(null);
    }


    return(
        <div className="page-inner">
            <PageAddressBar page={ `Proces wdrażania pracownika ${singleUser.name} ${singleUser.last_name}` } previousPages={[ {title: "Lista pracowników", url: "/user_list"} ]} />
            <div className="page-section">
                <EmployeeProfileUser user={ singleUser } goBackToMainProfilePage={ goBackToMainProfilePage } />
                <ProcessPreviewTables 
                    employeeId={ employeeId }
                    groupedPackages={ groupedPackages }
                    isLoading={ loadingPackages }
                    isError={ errorOfPackages }
                    count={ count }
                    setCount={ setCount }
                    answersPage={ answersPage }
                    setAnswersPage={ setAnswersPage }
                    updateSentAndFinished={ updateSentAndFinished }
                    goBackToMainProfilePage={ goBackToMainProfilePage }
                />
                {/* <ProcessPreviewTables packageId={ packageIdRef.current } loggedUser={ loggedUser }
                                        employee={ singleUser }
                                        count={ count }
                                        setCount={ setCount } /> */}
            </div>
        </div>
    )
}
export default EmployeeProfilePage;

