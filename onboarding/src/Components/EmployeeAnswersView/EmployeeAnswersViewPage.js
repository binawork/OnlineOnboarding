import React, { useRef } from "react";


function EmployeeAnswersViewPage(props){
    const packageIdRef = useRef(0);
    let loggedUser;
    if(props.location.state){
        packageIdRef.current = props.location.state.packageId;
        loggedUser = (props.location.state.loggedUser)?props.location.state.loggedUser:LoggedUser();
    } else
        loggedUser = LoggedUser();


    return(
        <></>
    )
}

export default EmployeeAnswersViewPage;

