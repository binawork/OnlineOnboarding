import React from "react";
import { Link } from 'react-router-dom';

function PageAddressBar({ page, previousPages=[] }) {
    return(
        <header className="page-title-bar p-0">
            <div className="card card-fluid">
                <div className="card-body">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                            <Link exact="true" to="/">DASHBOARD</Link>
                        </li>
                        {
                            previousPages && previousPages.map((element, i) => (
                                <li key={ `${element.title + i}` } className="breadcrumb-item">
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

