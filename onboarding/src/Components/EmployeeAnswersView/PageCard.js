import React from "react";


function PageCard(props) {
    let pageTitle, pageDesc="", link="", exists = true;

    if(props.page){
        if(props.page.title)
            pageTitle = props.page.title;
        else exists = false;

        if(props.page.description)
            pageDesc = props.page.description;
    }

    if(!exists)
        return <></>;

    if(props.page.link){
        link = props.page.link;
    }


    return(
        <div className="card card-fluid">
            <div className="card-header"> Formularz </div>
            <div className="card-body">
                <div className="card mb-2">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-auto">
                                <h2 className="card-title">{ pageTitle }</h2>
                            </div>

                            <div className="col">
                                <h3 className="card-title">
                                    <small className="text-muted">Opis:</small> { pageDesc }
                                </h3>
                            </div>
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
            </div>
        </div>
    )
}

export default PageCard;

