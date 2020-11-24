import React from "react";
import uuid from "uuid";
// import { addSection } from "../hooks/FormSectionsAPI";
import FormSectionsAPI from "../hooks/FormSectionsAPI";

function FormAddSection({ setSections, sections, updateMaxOrder, maxOrder, pageId }) {
    const handleAddSection = (e, sectionType) => {
        e.preventDefault();
        // FormSectionsAPI.addSection({ title: "", type: sectionType, page: pageId, order: maxOrder });
        const sectionToAdd = { id: uuid.v4(), type: sectionType, page: pageId, order: maxOrder + 1, title: "", description: "" };
        setSections([...sections, sectionToAdd]);
        updateMaxOrder(maxOrder + 1);
    }

    return (
      <div className="card my-3">
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

