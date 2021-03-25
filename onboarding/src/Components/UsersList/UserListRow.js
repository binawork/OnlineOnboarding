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
                                    message={ "Czy na pewno chcesz usunąć pracownika" }
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
        <div className="card mb-2">
            <div className="card-body w-100">
                <div className="UsersList__row row align-items-center m-0">
                    <div className="UsersList__row-data col d-flex align-items-center">
                        <div className="UsersList__column col d-flex align-items-center">
                            <div className="UsersList__avatar-box">
                                <Link to={{ pathname: `/employee/${props.user.id}`, state: { user: props.user } }} className="user-avatar user-avatar-xl">
                                    <img src={ avatar } alt="avatar" />
                                </Link>
                            </div>

                            <div className="">
                                <h3 className="card-title">
                                    <Link to={{ pathname: `/employee/${props.user.id}`, state: { user: props.user } }}>
                                        { props.user.name }
                                    </Link>
                                </h3>
                                <p className="card-subtitle text-muted">
                                    { props.user.email }
                                </p>
                                { props.user.position &&
                                    props.user.position !== "-" &&
                                    <>
                                    <small className="text-muted">
                                        { props.user.position }
                                    </small>
                                    <br />
                                    </>
                                }
                                { props.user.tel && (
                                    <small className="text-muted">
                                        { props.user.tel }
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="UsersList__column col d-flex flex-column flex-xl-row">
                            <div className="col">
                                <p className="card-title mb-2">
                                    <small className="text-muted">Dział: </small>
                                    { props.user.department
                                        ? props.user.department
                                        : <small className="text-muted"><i>brak</i></small>
                                    }
                                </p>
                                <p className="UsersList__element--margin-bottom card-title">
                                    <small className="text-muted">Lokalizacja: </small>
                                    { props.user.location
                                        ? props.user.location
                                        : <small className="text-muted"><i>brak</i></small>
                                    }
                                </p>
                            </div>

                            <div className="col">
                                <p className="card-title mb-2 text-nowrap">
                                    <small className="text-muted">Wysłane katalogi: </small>
                                    { props.user.sent
                                        ? props.user.sent
                                        : <small className="text-muted"><i>brak</i></small>
                                    }
                                </p>
                                <p className="card-title mb-0 text-nowrap">
                                    <small className="text-muted">Skończone katalogi: </small>
                                    { props.user.finished
                                        ? props.user.finished
                                        : <small className="text-muted"><i>brak</i></small>
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="UsersList__row-buttons col-auto d-flex flex-column">
                        <Link to={{ pathname: `/employee/${props.user.id}`, state: { user: props.user } }}
                            className="btn btn-secondary mb-1" 
                            data-toggle="tooltip"
                        >
                            Dodaj katalog
                        </Link>
                        <div className="d-flex">
                            <Link to={{ pathname: `/edit_employee/${props.user.id}`, state: { user: props.user } }}
                                className="UsersList__row-buttons--bottom btn btn-secondary mr-1" 
                                data-toggle="tooltip"
                            >
                                Edytuj profil
                            </Link>
                            <button
                                type="button"
                                value={ props.user.id }
                                onClick={ removeAsk }
                                className="UsersList__row-buttons--bottom btn btn-warning"
                                data-toggle="tooltip"
                                disabled={ loadingSave ? true : false }
                            >
                                Usuń
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {employeeIdModal.modal}
        </div>
    )
}

export default UserListRow;

