import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { employeeRemove } from "../hooks/Users";
import ModalWarning from "../ModalWarning";
import ProgressBar from "../ProgressBar";

function UserListRow(props) {
    const [loadingSave, setLoadingSave] = useState(false);
    const [employeeIdModal, setIdModal] = useState({id: 0, modal: <></>});
    
    let avatar = "/onboarding/static/images/unknown-profile.jpg";
    let percentage = "0";

    if(props.user.avatar && props.user.avatar.length > 1)
        avatar = props.user.avatar;

        const removeAsk = (e) => {
            setIdModal({id: e.target.value,
                modal: <ModalWarning handleAccept={ removeUser } handleCancel={ hideModal }
                                    title={ "Usunięcie pracownika" }
                                    message={ "Czy na pewno chcesz usunąć pracownika?" }
                                    show={ true }
                                    id={ e.target.value } />
            });
        }
    
        const hideModal = function(){
            setIdModal({id: 0, modal: <></>});
        }
    
        const removeUser = (id) => {
            hideModal();
            employeeRemove(popUpRemoveModal, id, setLoadingSave);
        }
    
        const popUpRemoveModal = (message) => {
            setIdModal({id: 0,
                modal: <ModalWarning handleAccept={ idle } title={ "Usunięcie pracownika" } message={ message } id={ 0 } show={ true } acceptText={ "Ok" } />
            });
        }
        const idle = () => {
            hideModal();
            props.update(props.countUpdate + 1);
        };

    return(
        <div className="UserListRow">
            <div className="UserListRow__employee-info">
                <div className="UserListRow__column">
                    <div className="UserListRow__avatar-box">
                        <Link to={{ pathname: `/employee/${props.user.id}`, state: { user: props.user } }} className="user-avatar user-avatar-xl">
                            <img className="UserListRow__avatar" src={ avatar } alt="avatar" />
                        </Link>
                    </div>

                    <div className="w-100">
                        <div className="UserListRow__column">
                            <div className="UserListRow__personal-box">
                                { props.user.name && (
                                    <h3 className="UserListRow__header">
                                        <Link to={{ pathname: `/employee/${props.user.id}`, state: { user: props.user } }}>
                                            { props.user.name }
                                        </Link>
                                    </h3>
                                )}
                                <p className="UserListRow__data">
                                    Stanowisko:
                                    { props.user.position
                                        ? <b> { props.user.position }</b>
                                        : <i> brak</i>
                                    }
                                </p>
                                <div className="UserListRow__data-wrapper">
                                    <div className="">
                                        <p className="UserListRow__data">
                                            Dział:
                                            { props.user.department
                                                ? <b> { props.user.department }</b>
                                                : <i> brak</i>
                                            }
                                        </p>
                                        <p className="UserListRow__data">
                                            Lokalizacja:
                                            { props.user.location
                                                ? <b> { props.user.location }</b>
                                                : <i> brak</i>
                                            }
                                        </p>
                                    </div>
                                    <div className="">
                                        <p className="UserListRow__data">
                                            e-mail:
                                            { props.user.location
                                                ? <b> { props.user.email }</b>
                                                : <i> brak</i>
                                            }
                                        </p>
                                        <p className="UserListRow__data">
                                            tel.:
                                            { props.user.tel
                                                ? <b> { props.user.tel }</b>
                                                : <i> brak</i>
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="UserListRow__buttons">
                            <Link to={{ pathname: `/employee/${props.user.id}`, state: { user: props.user } }}
                                className="UserListRow__button UserListRow__button--top btn mb-2" 
                                data-toggle="tooltip"
                            >
                                Wyślij wdrożenie
                            </Link>
                            <div className="UserListRow__buttons-bottom">
                                <Link to={{ pathname: `/edit_employee/${props.user.id}`, state: { user: props.user } }}
                                    className="UserListRow__button btn mr-2" 
                                    data-toggle="tooltip"
                                >
                                    Edytuj profil
                                </Link>
                                <button
                                    type="button"
                                    value={ props.user.id }
                                    onClick={ removeAsk }
                                    className="UserListRow__button btn"
                                    data-toggle="tooltip"
                                    disabled={ loadingSave ? true : false }
                                >
                                    Usuń
                                </button>
                            </div>
                        </div>
                        </div>

                        <div className="UserListRow__progress UserListRow__progress--absolute">
                            <ProgressBar color="blue" backgroundSize={ `${percentage}%` } />
                            <p className="UserListRow__data text-nowrap m-0">
                                { props.user.finished || 0 }/{ props.user.sent || 0 }
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
            {employeeIdModal.modal}
        </div>
    )
}

export default UserListRow;

