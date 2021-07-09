import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import '../static/css/Modal.scss';

// Alert Warning Modal
function ModalWarning(props) {
    const linkButton = useRef();
    
    useEffect(() => {
        if(props.link) {
            linkButton.current?.focus();
        }
    }, [])

    let state = {className: "modal modal-alert fade", border: {} };
    if(props.show)
        state = {className: "modal modal-alert fade show d-flex align-items-center" };

    let message = "Powiadomienie", title = "Tytuł";
    if(typeof props.message === "string")
        message = props.message;
    if(typeof props.title === "string")
        title = props.title;


    let acceptText = "Usuń";
    if(typeof props.acceptText === "string")
        acceptText = props.acceptText;


    let link, useLink = false;
    if(props.link && props.link.to){
        useLink = true;
        link = (<NavLink to={ props.link.to } className="btn btn-warning" ref={ linkButton }>
        { acceptText }</NavLink>);
    }


    let cancelButton = <></>;
    if(props.handleCancel)
        cancelButton = <button type="button" onClick={ props.handleCancel } className="Modal__button btn">Anuluj</button>;

    const accept = () => {
        props.handleAccept(props.id);
    }

    return(
        <section className={`Modal ${ state.className }`} onClick={ props.handleCancel } data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="modalAlertWarningLabel" aria-hidden="false">
            <div className="Modal__dialog modal-dialog w-100" role="document">
                {/* -- .modal-content -- */}
                <div className="Modal__content">
                    <div className="Modal__header modal-header">
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
                         <button type="button" onClick={ accept } className="Modal__button btn" data-dismiss="modal" autoFocus>
                             { acceptText }
                         </button>
                     )} { cancelButton }
                    </div>
                </div>
            </div>
        </section>
    )
}

ModalWarning.propTypes = {
    handleAccept: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object
    ]),
    show: PropTypes.bool,
    acceptText: PropTypes.string, 
}

export default ModalWarning;

