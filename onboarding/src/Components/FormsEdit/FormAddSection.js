import React from "react";
import { addSection } from "../hooks/FormSectionsAPI";

function FormAddSection({ updateSections, maxOrder, pageId }) {

    // const openAnswerClick = (e) => {
    //     e.preventDefault();
    // 	addSection("oa", pageId, updateSections, maxOrder)
    // }
    // const oneChoiceClick = (e) => {
    //     e.preventDefault();
    //     addSection("osa", pageId, updateSections, maxOrder)
    // }
    // const multiChoiceClick = (e) => {
    //     e.preventDefault();
	// 	addSection("msa", pageId, updateSections, maxOrder)
    // }
    const handleAddSection = (e, sectionType) => {
        e.preventDefault();
        console.log(e.target, sectionType)
		addSection(sectionType, pageId, updateSections, maxOrder)
    }

    return(
      <div className="card card-fluid">
          <div className="card-header">Rodzaj pytania</div>
          <div className="card-body align-items-center">
                <div className="form-group row">
                    <div className="col-auto">&#9776;</div>
                    <div className="col">
                        <div className="input-group-append">
                            {/* <button className="btn btn-secondary" onClick={ openAnswerClick }>Pytanie otwarte</button> */}
                            <button className="btn btn-secondary" onClick={ (e) => handleAddSection(e, "oa") }>Pytanie otwarte</button>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-auto">&#9711;</div>
                    <div className="col">
                        <div className="input-group-append">
                            {/* <button className="btn btn-secondary" onClick={ oneChoiceClick } >Jednokrotny wybór</button> */}
                            <button className="btn btn-secondary" onClick={ (e) => handleAddSection(e, "osa") } >Jednokrotny wybór</button>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-auto">&#9745;</div>
                    <div className="col">
                        <div className="input-group-append">
                            {/* <button className="btn btn-secondary" onClick={ handleAddSection } >Wielokrotny wybór</button> */}
                            <button className="btn btn-secondary" onClick={ (e) => handleAddSection(e, "msa") } >Wielokrotny wybór</button>
                        </div>
                    </div>
                </div>
          </div>
      </div>
    )
}

export default FormAddSection;

