import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { dateToString } from "../utils";
import "../../static/css/packages.css";


function PackagesRow({ row, removeAsk, lastRow }) {
    const [styleRow, setStyleRow] = useState(null);
    const [showPages, setShowPages] = useState(false);
    const [rotate, setCaretIcon] = useState(false);
    const [showStyle, setShowStyle] = useState("none");

    const pagesRows = row.pages.map((page) => 
        <tr className="table__row" key={ page.id } style={{ display: showStyle }}>
            <td colSpan="3">
                <i className="fas fa-file" style={{ width: "24px", margin: "0 2px 0 52px" }}></i>
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
            </td>
        </tr>
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
        setShowStyle(showStyle === "none" ? "table-row" : "none");
    };

    return(
        <>
            <tr className={ `table__row ${styleRow || ""}` }>
                <td className="table__data" style={{ paddingLeft: row.pages.length === 0 ? "38px" : "" }}>
                    <div>
                        <button 
                            className={`caret-icon ${rotate ? "caret-rotate" : ""}`}
                            onClick={ toggleShowPages }
                            style={{ display: row.pages.length > 0 ? "inline-block" : "none" }}
                        >
                            <i className="fas fa-caret-right"></i>
                        </button> 
                        <i className="fa fa-folder folder-icon"></i>
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
                            className="link mr-4" 
                            title="Kliknij, aby przejść do edycji zawartości katalogu"
                        >{ row.name }</Link>
                        <small className="info-tag">
                            Liczba plików: { row.pages.length || 0 }
                        </small>
                    </div>
                    <small><i>{ row.description }</i></small>
                </td>

                <td className="table__data">{ dateToString(row.last_edit) }</td>

                <td  className="table__data table__data--nowrap">
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
                        className="btn btn-secondary mr-1"
                    >
                        Edytuj
                    </Link>
                    <button 
                        value={ row.id }
                        className="btn btn-warning"
                        onClick={ removeAsk }
                    >
                        Usuń
                    </button>
                </td>
            </tr>
            { showPages && pagesRows }
        </>
    )
}
export default PackagesRow;
