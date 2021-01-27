import React from "react";
import { Link } from 'react-router-dom';

function PageAddressBar({ page, previousPages=[] }) {
    return(
        <header className="page-title-bar">
            <div className="card card-fluid">
                <div className="card-body">
                    <h4 className="card-title">  </h4>
                    <hr />
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link exact="true" to="/">DASHBOARD</Link>
                        </li>
                        {
                            previousPages && previousPages.map(element => (
                                <li className="breadcrumb-item">
                                    <Link to={ element.url }>{ element.title }</Link>
                                </li>
                            ))
                        }
                        { page && <li className="breadcrumb-item active">{ page }</li> }
                    </ol>
                </div>
            </div>
        </header>
    )
}

export default PageAddressBar;

