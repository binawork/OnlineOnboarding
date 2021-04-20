import React from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "../static/css/PageAddressBar.scss";

function PageAddressBar({ page, previousPages=[] }) {
    return(
        <header className="PageAddressBar page-title-bar p-0">
            <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                    <NavLink
                        className="PageAddressBar__link"
                        activeClassName="PageAddressBar__link--active" 
                        exact to="/">DASHBOARD</NavLink>
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

