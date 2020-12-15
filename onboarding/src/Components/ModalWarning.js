import React from "react";
import { NavLink } from "react-router-dom";


// Alert Warning Modal
function ModalWarning(props) {
    let state = {className: "modal modal-alert fade", style: {}, border: {} };
    if(props.show)
        state = {className: "modal modal-alert fade show", style: {display: "block"}, border:{border:"1px solid #FFF"} };

    let message = "Powiadomienie", title = "Tytuł";
    if(typeof props.message === "string")
        message = props.message;
    if(typeof props.title === "string")
        title = props.title;


    let acceptText = "Usuń";
    if(typeof props.acceptText === "string")
        acceptText = props.acceptText;


    let link, useLink = false;
    if(props.link && props.link.loggedUser && typeof props.link.packageId !== 'undefined' && props.link.to){
        useLink = true;
        link = (<NavLink to={{ pathname: props.link.to, state: { packageId: props.link.packageId, loggedUser: props.link.loggedUser } }} className="btn btn-warning" >
        { acceptText }</NavLink>);
    }


    let cancelButton = <></>;
    if(props.handleCancel)
        cancelButton = <button type="button" onClick={ props.handleCancel } className="btn btn-light">Anuluj</button>;

    const accept = () => {
        props.handleAccept(props.id);
    }

    return(
        <div className={ state.className } style={ state.style } data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="modalAlertWarningLabel" aria-hidden="false">
            <div className="modal-dialog" role="document">
                {/* -- .modal-content -- */}
                <div className="modal-content" style={ state.border }>
                    <div className="modal-header">
                        <h5 id="modalAlertWarningLabel" className="modal-title">
                          <i className="fa fa-bullhorn text-warning mr-1"></i> { title } </h5>
                    </div>
                    <div className="modal-body">
                        <p> { message } </p>
                    </div>
                    <div className="modal-footer">
                     {useLink ? (
                         link
                     ) : (
                         <button type="button" onClick={ accept } className="btn btn-warning" data-dismiss="modal" autoFocus>{ acceptText }</button>
                     )} { cancelButton }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalWarning;

