import React, { useState, useEffect } from "react";
import ImplementationFormsSent from "./ImplementationFormsSent";
import ImplementationFormsToSend from "./ImplementationFormsToSend";
import ModalWarning from "../ModalWarning";
import EmployeeAnswersViewPage from "../EmployeeAnswersView/EmployeeAnswersViewPage";
import { getProgress, datesOfSendingPackages } from "../hooks/EmployeeForms";


function ProcessPreviewTables(props) {
    const [loading, setLoading] = useState(true);
    const [sentPackages, setSentPackages] = useState([]);
    const [confirmationModal, setIdModal] = useState({id: 0, modal: <></>});


    const progressCallback = (result, message) => {
    	if(typeof message === 'string' && message.length > 0)
    		return;// todo: maybe inform about error;

        let i, j, packageId, pId, isFinished, countFinished = 0;
        const notStartedMsg = "Nie rozpoczął", inProgressMsg = "W trakcie", finishedMsg = "Skończone";

        for(i = props.groupedPackages.sent.length - 1; i >= 0; i--){
            packageId = parseInt(props.groupedPackages.sent[i].key, 10);
            props.groupedPackages.sent[i].finish_date = notStartedMsg;

            if( !result.hasOwnProperty(packageId) ){
                props.groupedPackages.sent[i].progress = "0" + props.groupedPackages.sent[i].progress.substring(1);// "0/" + groupedPackages.sent[i].pagesCount;
                continue;
            }

            props.groupedPackages.sent[i].progress = result[packageId].finished + "/" + props.groupedPackages.sent[i].progress.substring(2);

            props.groupedPackages.sent[i].percentage = result[packageId].finished / props.groupedPackages.sent[i].pagesCount;
            if(result[packageId].finished == 0)
                props.groupedPackages.sent[i].percentage = 0.01;

            props.groupedPackages.sent[i].finish_date = inProgressMsg;

            isFinished = true;
            for(j = props.groupedPackages.sent[i].pages.length - 1; j >= 0; j--){
                props.groupedPackages.sent[i].pages[j].finished = notStartedMsg;
                props.groupedPackages.sent[i].pages[j].finishMsg = notStartedMsg;
                props.groupedPackages.sent[i].pages[j].percentage = 0;

                pId = parseInt(props.groupedPackages.sent[i].pages[j].id, 10);
                if( result[packageId].pages.hasOwnProperty(pId) ){
                    if(result[packageId].pages[pId].finished){
                        props.groupedPackages.sent[i].pages[j].finished = result[packageId].pages[pId].date;
                        props.groupedPackages.sent[i].pages[j].finishMsg = finishedMsg;
                        props.groupedPackages.sent[i].pages[j].percentage = 100;
                    } else {
                        props.groupedPackages.sent[i].pages[j].finished = props.groupedPackages.sent[i].pages[j].finishMsg = inProgressMsg;
                        props.groupedPackages.sent[i].pages[j].percentage = 50;
                        isFinished = false;
                    }
                }
            }

            if(isFinished){
                props.groupedPackages.sent[i].finish_date = result[packageId].date;
                countFinished++;
            }
        }

        // setSentPackages(props.groupedPackages.sent);
        datesOfSendingPackages(props.employeeId, sendDateCallback);
        i = props.groupedPackages.sent.length;
        props.updateSentAndFinished(i, countFinished);
    };

    const sendDateCallback = function(result, message){
        if(!result && (typeof message === 'undefined' || typeof message !== 'string') )
            return;

        let newFormTable = [];

        if(typeof message === 'string')
            newFormTable = props.groupedPackages.sent.map(function(element){
                    element.send_date = message;
                    return element;
                });
        else if(typeof result === 'object'){
            let packageId;
            newFormTable = props.groupedPackages.sent.map(function(element){
                    packageId = parseInt(element.key, 10);
                    if( result.hasOwnProperty(packageId) )
                        element.send_date = result[packageId];

                    return element;
                });
        }

        if(newFormTable.length > 0){
            setSentPackages(props.groupedPackages.sent);
        }
        //setLoading(false);
    };


    /*const loadingCallback = function(isLoading){
        setLoading(isLoading);
        props.addSent();
    };*/

    const popUpConfirmationModal = (message) => {
        let count = confirmationModal.id;
        setIdModal({id: count,
            modal: <ModalWarning handleAccept={ hideModal } title={ "Potwierdzenie wysłania" } message={ message } id={ count } show={ true } acceptText={ "Ok" } />
        });
    };

    const hideModal = function(id){
        setIdModal({id: id + 1, modal: <></>});
    };

    const errorCallback = (isError) => {
        if(isError){
            let count = confirmationModal.id, msg = "";
            setIdModal({id: count,
                modal: <ModalWarning handleAccept={ hideModal } title={ "Nastąpił błąd!" } message={ msg } id={ count } show={ true } acceptText={ "Ok" } />
            });
        }
    };


    useEffect(() => {
        if(props.groupedPackages.hasOwnProperty('sent') && props.groupedPackages.sent.length > 0){
            let abortFun = getProgress(props.employeeId, progressCallback);
            return abortFun;
        }
    }, [props.groupedPackages]);


    return(
        <>
            {
                props.answersPage
                    ? <EmployeeAnswersViewPage employeeId={ props.employeeId } page={ props.answersPage } goBackToMainProfilePage={ props.goBackToMainProfilePage } />
                    : (
                        <>
                        <ImplementationFormsSent 
                            employeeId={ parseInt(props.employeeId) }
                            packages={ sentPackages }
                            setAnswersPage={ props.setAnswersPage }
                            showModal={ popUpConfirmationModal }
                            count={ confirmationModal.id }
                        />
                        <ImplementationFormsToSend 
                            employeeId={ parseInt(props.employeeId) }
                            packages={ props.groupedPackages.available }
                            showModal={ popUpConfirmationModal }
                            count={ props.count }
                            setCount={ props.setCount }
                        />
                        { confirmationModal.modal }
                        </>
                    )
            }

            {/* <ImplementationFormsSent packageId={ props.packageId } 
                                     employee={ props.employee }
                                     showModal={ popUpConfirmationModal }
                                     count={ confirmationModal.id } /> */}
            {/* <ImplementationFormsToSend showModal={ popUpConfirmationModal } userId={ props.employee.id }  count={ props.count } setCount={ props.setCount } /> */}
        </>
    )
}
export default ProcessPreviewTables;

