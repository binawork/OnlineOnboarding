import React from "react";
import bookIcon from "../../static/icons/book.svg";
import bookOpenedIcon from "../../static/icons/book-opened.svg";

function PageCard({ page, packageOfAnswers }) {
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
        <>
        <section className="EmployeeAnswersView__card">
            <div className="align-items-center">
                <img className="EmployeeAnswersView__book" src={ bookIcon } alt="#" />
                <i className="">Tytuł wdrożenia: </i>
                <h1 className="EmployeeAnswersView__title">
                    { packageOfAnswers.name }
                </h1>
            { packageOfAnswers.description &&
                <p className="EmployeeAnswersView__text">
                    <i className="">Opis: </i>
                    { packageOfAnswers.description }
                </p>
            }
            </div>
        </section>
        <section className="EmployeeAnswersView__card EmployeeAnswersView__card--smaller">
            <img className="EmployeeAnswersView__book" src={ bookOpenedIcon } alt="#" />
            <i className="">Rozdział: </i>
            <h2 className="EmployeeAnswersView__title">
                { pageTitle }
            </h2>
            { pageDesc &&
                <p className="EmployeeAnswersView__text">
                    <i className="">Opis: </i>
                    { pageDesc }
                </p>
            }
            { link.length > 0 &&
                <p className="EmployeeAnswersView__text">
                    <i className="">Link: </i>
                    <a href={ link } target="_blank">{ link }</a>
                </p>
            }
        </section>
        </>
    )
}

export default PageCard;

