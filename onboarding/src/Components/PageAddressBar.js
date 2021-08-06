import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "../static/css/PageAddressBar.scss";
import arrow from "../static/icons/arrow-left.svg";

function PageAddressBar({ page, previousPages=[] }) {
    const history = useHistory();

    const handleBack = () => {
        history.goBack();
    }

    return(
        <header className="PageAddressBar page-title-bar">
            <button className="PageAddressBar__button btn" onClick={ handleBack }>
                <img className="PageAddressBar__arrow" src={ arrow } alt="#" />
                Wstecz
            </button>
            <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                    <NavLink
                        className="PageAddressBar__link"
                        activeClassName="PageAddressBar__link--active" 
                        exact to="/">Dashboard</NavLink>
                </li>
                {
                    previousPages && previousPages.map((element, i) => (
                        <li key={ `${element.title + i}` } className="breadcrumb-item">
                            <Link to={ element.url } className="PageAddressBar__link">{ element.title }</Link>
                        </li>
                    ))
                }
                { page && <li className="PageAddressBar__item--active breadcrumb-item">{ page }</li> }
            </ol>
        </header>
    )
}

PageAddressBar.propTypes = {
    page: PropTypes.string.isRequired,
    previousPages: PropTypes.array,
};

export default PageAddressBar;

