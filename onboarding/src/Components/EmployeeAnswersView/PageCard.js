import React from "react";


function PageCard({ page }) {
    let pageTitle, pageDesc="", link="", exists = true;

    if(page){
        if(page.title)
            pageTitle = page.title;
        else exists = false;

        if(page.description)
            pageDesc = page.description;
    }

    if(!exists)
        return <></>;

    if(page.link){
        link = page.link;
    }

    return(
        <div className="card card-fluid">
            <div className="card-header"> Formularz </div>
            <div className="card-body">
                <div className="align-items-center">
                    <h2 className="card-title">
                        <small className="text-muted">Nazwa: </small>
                        { pageTitle }
                    </h2>
                    <h3 className="card-title">
                        <small className="text-muted">Opis: </small>
                        { pageDesc }
                    </h3>
                </div>
                { link.length > 0 &&
                    <div className="row align-items-center">
                        <div className="col-auto">
                            <a href={ link } target="_blank">{ link }</a>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default PageCard;

