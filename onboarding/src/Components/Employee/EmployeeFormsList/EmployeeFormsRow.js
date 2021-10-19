import React, { useState } from "react";
import { Link } from "react-router-dom";
import bookIcon from "../../../static/icons/book.svg";
import bookOpenedIcon from "../../../static/icons/book-opened.svg";
import ProgressBar from "../../ProgressBar";

function EmployeeFormsRow({ row }) {
    const [showPages, setShowPages] = useState(false);
    const [rotate, setCaretIcon] = useState(false);
    const [showStyle, setShowStyle] = useState("none");

    const pagesRows = row.pages.map((page) =>
        <li className="PackagesChapter" key={ page.id } style={{ display: showStyle }}>
            <img className="PackagesChapter__icon" src={ bookOpenedIcon } alt="#" />
            <Link
                to={{
                    pathname: `/form/${page.id}`,
                    state: {
                        packageId: row.id,
                        packageTitle: row.name,
                        formId: page.id,
                        formName: page.title,
                        description: page.description,
                        link: page.link,
                    },
                }}
            >
                { page.title }
            </Link>
            {/* <ProgressBar color="blue" backgroundSize={ `${percentage}%` } /> */}
        </li>
    )

    const toggleShowPages = function () {
        setCaretIcon(!rotate);
        setShowPages(!showPages);
        setShowStyle(showStyle === "none" ? "flex" : "none");
    };

    return (
        <li className="PackagesItem PackagesItem--two-columns mb-3">
            <div className="PackagesItem__title-wrapper">
                <button
                    className={`PackagesItem__caret caret-icon ${rotate ? "caret-icon--rotate" : ""}`}
                    onClick={toggleShowPages}
                    style={{ display: row.pages.length > 0 ? "inline-block" : "none" }}
                >
                    <i className="fas fa-caret-right"></i>
                </button>
                <img src={bookIcon} alt="#" />

                <Link to={`package/${row.id}`} className="PackagesItem__link link">
                    <header className="PackagesItem__title">{row.name}</header>
                </Link>
            </div>
            <span className="PackagesItem__progress">{ row.progress }</span>
            { showPages && (
                <ul className="PackagesSublist">
                    <hr className="PackagesSublist__line" />
                    { pagesRows }
                </ul>
            )}
        </li>
    )
}
export default EmployeeFormsRow;

