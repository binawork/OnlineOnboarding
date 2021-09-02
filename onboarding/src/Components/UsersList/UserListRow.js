import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { employeeRemove } from "../hooks/Users";
import ModalWarning from "../ModalWarning";

function UserListRow(props) {
    const [loadingSave, setLoadingSave] = useState(false);
    const [employeeIdModal, setIdModal] = useState({id: 0, modal: <></>});
    
    let avatar = "/onboarding/static/images/unknown-profile.jpg";

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
                <div className="UserListRow__column col">
                    <div className="UserListRow__avatar-box">
                        <Link to={{ pathname: `/employee/${props.user.id}`, state: { user: props.user } }} className="user-avatar user-avatar-xl">
                            <img className="UserListRow__avatar" src={ avatar } alt="avatar" />
                        </Link>
                    </div>

                    <div className="UserListRow__personal-box">
                        { props.user.name && (
                            <h3 className="UserListRow__header">
                                <Link to={{ pathname: `/employee/${props.user.id}`, state: { user: props.user } }}>
                                    { props.user.name }
                                </Link>
                            </h3>
                        )}
                        { props.user.position &&
                            props.user.position !== "-" &&
                            <p className="card-subtitle">
                                { props.user.position }
                            </p>
                        }
                        <small className="">
                            { props.user.email }
                        </small>
                        { props.user.tel && (
                            <small className="">
                                { props.user.tel }
                            </small>
                        )}
                    </div>
                </div>

                <div className="UserListRow__column col">
                    <div className="col">
                        <p className="UserListRow__data">
                            Dział:
                            { props.user.department
                                ? <b> { props.user.department }</b>
                                : <i> brak</i>
                            }
                        </p>
                        <p className="UserListRow__data UserListRow__data--margin">
                            Lokalizacja:
                            { props.user.location
                                ? <b> { props.user.location }</b>
                                : <i> brak</i>
                            }
                        </p>
                    </div>

                    <div className="col">
                        <p className="UserListRow__data text-nowrap">
                            Wysłane katalogi:
                            { props.user.sent
                                ? <b> { props.user.sent }</b>
                                : <b> 0</b>
                            }
                        </p>
                        <p className="UserListRow__data text-nowrap">
                            Skończone katalogi: 
                            { props.user.finished
                                ? <b> { props.user.finished }</b>
                                : <b> 0</b>
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
                    Dodaj katalog
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
            {employeeIdModal.modal}
        </div>
    )
}

export default UserListRow;

