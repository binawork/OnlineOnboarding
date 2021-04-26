import React, { useState, useEffect } from "react";
import ImplementationFormsSent from "./ImplementationFormsSent";
import ImplementationFormsToSend from "./ImplementationFormsToSend";
import ModalWarning from "../ModalWarning";
import EmployeeAnswersViewPage from "../EmployeeAnswersView/EmployeeAnswersViewPage";
import { getProgress, datesOfSendingPackages, withholdPackageFromEmployee } from "../hooks/EmployeeForms";


function ProcessPreviewTables(props) {
    const [loading, setLoading] = useState(true);
    const [sentPackages, setSentPackages] = useState([]);
    const [confirmationModal, setIdModal] = useState({id: 0, modal: <></>});


    const progressCallback = (result, message) => {
    	if(typeof message === 'string' && message.length > 0)
    		return;// todo: maybe inform about error;

        let i, j, packageId, pId, isFinished, countFinished = 0, countPages;
        const notStartedMsg = "Nie rozpoczął", inProgressMsg = "W trakcie", finishedMsg = "Skończone";

        for(i = props.groupedPackages.sent.length - 1; i >= 0; i--){
            packageId = parseInt(props.groupedPackages.sent[i].id, 10);
            props.groupedPackages.sent[i].finish_date = notStartedMsg;

            if( !result.hasOwnProperty(packageId) ){
                props.groupedPackages.sent[i].progress = "0" + props.groupedPackages.sent[i].progress.substring(1);// "0/" + groupedPackages.sent[i].pagesCount;
                continue;
            }

            props.groupedPackages.sent[i].progress = result[packageId].finished + " " + props.groupedPackages.sent[i].progress.substring(2);

            props.groupedPackages.sent[i].percentage = result[packageId].finished / props.groupedPackages.sent[i].pagesCount;
            if(result[packageId].finished == 0)
                props.groupedPackages.sent[i].percentage = 0.01;

            props.groupedPackages.sent[i].finish_date = inProgressMsg;

            isFinished = true;
            countPages = 0;
            j = props.groupedPackages.sent[i].pages.length - 1;
            for(; j >= 0; j--){
                props.groupedPackages.sent[i].pages[j].finished = notStartedMsg;
                props.groupedPackages.sent[i].pages[j].finishMsg = notStartedMsg;
                props.groupedPackages.sent[i].pages[j].percentage = 0;

                pId = parseInt(props.groupedPackages.sent[i].pages[j].id, 10);
                if( result[packageId].pages.hasOwnProperty(pId) ){
                    countPages++;
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

            if(isFinished && countPages == props.groupedPackages.sent[i].pagesCount){
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
                    packageId = parseInt(element.id, 10);
                    if( result.hasOwnProperty(packageId) )
                        element.send_date = result[packageId];

                    return element;
                });
        }

        if(newFormTable.length > 0){
            setSentPackages(newFormTable);
        }
        setLoading(false);
    };


    /*const loadingCallback = function(isLoading){
        setLoading(isLoading);
        props.addSent();
    };*/

    const withholdPackage = (idObject) => {
        hideModal(idObject.id);
        withholdPackageFromEmployee(popUpConfirmationForWithhold, parseInt(props.employeeId), idObject.packageId);
    };

    const popUpConfirmationModal = (message) => {
        let count = confirmationModal.id;
        setIdModal({id: count,
            modal: <ModalWarning handleAccept={ hideModal } title={ "Potwierdzenie wysłania" } message={ message } id={ count } show={ true } acceptText={ "Ok" } />
        });
    };

    const popUpAskForWithholdPackage = (packageId) => {
        let idObject = {id: confirmationModal.id, packageId: packageId};
        setIdModal({id: confirmationModal.id,
            modal: <ModalWarning id={ idObject } title={ "Usuwanie katalogu" }
                                 handleAccept={ withholdPackage } handleCancel={ hideModal }
                                 message={ "Ten katalog zostanie usunięty u pracownika. Czy chcesz to zrobic?" }
                                 show={ true } acceptText={ "Ok" } />
        });
    };

    const popUpConfirmationForWithhold = function(message, isError){
        let title = "Usuwanie katalogu", count = confirmationModal.id;
        if(isError === true) // it excludes 'undefined' case;
            title = "Wystąpił błąd!";

        setIdModal({id: count,
            modal: <ModalWarning handleAccept={ hideModal } title={ title } message={ message } id={ count } show={ true } acceptText={ "Ok" } />
        });

        if(!isError)
            props.setCount(props.count + 1);
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
            setSentPackages(props.groupedPackages.sent);
            let abortFun = getProgress(props.employeeId, progressCallback);
            return abortFun;
        }
    }, [props.groupedPackages]);

    /*useEffect(() => {
        if(props.isError)
            console.log("Error of packages");// todo;
    }, [props.isError]);*/


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
                            isLoading={ loading }
                            isError={ props.isError }
                            showModal={ popUpConfirmationModal }
                            askForWithholdPackage={ popUpAskForWithholdPackage }
                            count={ confirmationModal.id }
                        />
                        <ImplementationFormsToSend 
                            employeeId={ parseInt(props.employeeId) }
                            packages={ props.groupedPackages.available }
                            isLoading={ props.isLoading }
                            isError={ props.isError }
                            showModal={ popUpConfirmationModal }
                            count={ props.count }
                            setCount={ props.setCount }
                        />
                        { confirmationModal.modal }
                        </>
                    )
            }
        </>
    )
}
export default ProcessPreviewTables;

