import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dateToString } from "../utils";
import Tag from "../Tag";
import bookIcon from "../../static/icons/book.svg";
import bookOpenedIcon from "../../static/icons/book-opened.svg";
import trashIcon from "../../static/icons/trash.svg";

function PackagesRow({ row, removeAsk, lastRow }) {
    const [styleRow, setStyleRow] = useState(null);
    const [showPages, setShowPages] = useState(false);
    const [rotate, setCaretIcon] = useState(false);
    const [showStyle, setShowStyle] = useState("none");
    const date = dateToString(row.last_edit);

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
        </li>
    )

    useEffect(() => {
        if(lastRow && Date.now() - Date.parse(row.created) < 3000) {
            setStyleRow("style-package-row");
        } else {
            setStyleRow(null);
        }
    }, [lastRow]);

    const toggleShowPages = function(){
        setCaretIcon(!rotate);
        setShowPages(!showPages);
        setShowStyle(showStyle === "none" ? "flex" : "none");
    };

    return(
        <>
            <li className={`PackagesItem ${styleRow || ""}`}>
                <div className="PackagesItem__title-wrapper">
                    <button 
                        className={`PackagesItem__caret caret-icon ${rotate ? "caret-icon--rotate" : ""}`}
                        onClick={ toggleShowPages }
                        style={{ display: row.pages.length > 0 ? "inline-block" : "none" }}
                    >
                        <i className="fas fa-caret-right"></i>
                    </button>
                    <img src={ bookIcon } alt="#" />

                    <Link to={{ 
                        pathname: `/package/${row.id}`,
                        state: {
                            packageData: {
                                id: row.id,
                                title: row.name,
                                description: row.description
                            },
                            pages: row.pages
                        }}}
                        className="PackagesItem__link link" 
                        title="Kliknij, aby przejść do edycji zawartości katalogu"
                    >
                        <h4 className="PackagesItem__title">{ row.name }</h4>
                    </Link>
                </div>
                <div className="PackagesItem__tag-wrapper px-1">
                    <Tag title={`Liczba rozdziałów: ${ row.pages.length || 0 }`} color={"grey"} />
                </div>
                <div className="PackagesItem__date px-1">{ date }</div>
                <div className="PackagesItem__buttons-wrapper">
                    <Link to={ `/send_package/${row.id}` } className="PackagesItem__button PackagesItem__button--first btn">
                        Wyślij pracownikowi
                    </Link>
                    <div className="PackagesItem__buttons-box">
                        <Link to={{ 
                                pathname: `/package/${row.id}`,
                                state: {
                                    packageData: {
                                        id: row.id,
                                        title: row.name,
                                        description: row.description
                                    },
                                    pages: row.pages
                                }
                            }}
                            className="PackagesItem__button btn"
                        >Edytuj</Link>
                        <button 
                            value={ row.id }
                            className="PackagesItem__button PackagesItem__button--fit btn"
                            onClick={ removeAsk }>
                            <img src={ trashIcon } alt="#" />
                        </button>
                    </div>
                </div>
                { showPages && (
                    <ul className="PackagesSublist">
                        <hr className="PackagesSublist__line" />
                        { pagesRows }
                    </ul>
                )}
            </li>
        </>
    )
}
export default PackagesRow;
