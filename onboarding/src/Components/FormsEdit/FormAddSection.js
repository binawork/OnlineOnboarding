import React from "react";
import uuid from "uuid";

function FormAddSection({
  setSections,
  sections,
  setAnswers,
  answers,
  updateMaxOrder,
  maxOrder,
  pageId,
}) {
  const handleAddSection = (e, sectionType) => {
    e.preventDefault();
    const sectionToAdd = {
      id: uuid.v4(),
      type: sectionType,
      page: pageId,
      order: maxOrder + 1,
      title: "",
      description: "",
    };
    const answerToAdd = {
      id: uuid.v4(),
      data: "Odpowiedź",
      section: sectionToAdd.id,
    };
    setSections([...sections, sectionToAdd]);
    setAnswers([...answers, answerToAdd]);
    updateMaxOrder(maxOrder + 1);
  };

  return (
    <div style={{ position: "sticky", top: "100px" }}>
      <div className="card my-3">
        <div className="card-header">Dodaj pytanie</div>
        <div className="card-body align-items-center">
          <div className="form-group row">
            <div className="col-auto">&#9776;</div>
            <div className="col">
              <div className="input-group-append">
                <button
                  className="btn btn-secondary"
                  onClick={(e) => handleAddSection(e, "oa")}
                >
                  Pytanie otwarte
                </button>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-auto">&#9711;</div>
            <div className="col">
              <div className="input-group-append">
                <button
                  className="btn btn-secondary"
                  onClick={(e) => handleAddSection(e, "osa")}
                >
                  Jednokrotny wybór
                </button>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-auto">&#9745;</div>
            <div className="col">
              <div className="input-group-append">
                <button
                  className="btn btn-secondary"
                  onClick={(e) => handleAddSection(e, "msa")}
                >
                  Wielokrotny wybór
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="input-group-append">
          <button type="submit" className="btn btn-success">
            Zapisz pytania
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormAddSection;
