import React, { useState } from "react";
import uuid from "uuid";
import AnswersKey from "../EmployeeAnswersView/AnswersKey";

function FormAddSection({
  setSections,
  sections,
  updateMaxOrder,
  maxOrder,
  pageId,
  setEditMode,
  editMode
}) {
  const [key, setKey] = useState(false);

  const handleAddSection = (e, sectionType) => {
    e.preventDefault();
    const sectionToAdd = {
      id: uuid.v4(),
      type: sectionType,
      page: pageId,
      order: maxOrder + 1,
      title: "",
      description: "",
      data: [],/* [{title: sectionType === "oa" ? "" : "Odpowiedź", is_checked: false}]; */
      isNew: true
    };

    setSections([...sections, sectionToAdd]);
    updateMaxOrder(maxOrder + 1);
  };

  const handleChangeMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  }

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
        <div className="input-group-append mb-1">
          <button type="submit" className="btn btn-success mr-1">
            Zapisz pytania
          </button>
          <button className="btn btn-success" onClick={ handleChangeMode }>
            { editMode
              ? "Podgląd"
              : "Edytuj"
            }
          </button>
        </div>
        <button type="button" className="btn btn-success" onClick={() => setKey(!key)}>
          Legenda
        </button>
      </div>
      { key && 
        <div className="AnswersKey--fixed d-flex justify-content-center align-items-center" onClick={() => setKey(!key)}>
          <section className="card card-fluid p-3 AnswersKey">
            <div className="card-body">
              <header>
                <p className="text-uppercase text-center">Legenda</p>
                <p className="text-center">Przesuwając suwak w prawo w szablonie odpowiedzi zaznaczasz prawidłowe odpowiedzi. Dzięki temu szybciej ocenisz feedback.</p>
                <div className="d-flex flex-column align-items-center mb-3">
                  <label className="switcher-control switcher-control-success mb-2">
                    <span type="checkbox" className="switcher-input" />
                    <span className="switcher-indicator border border-white" style={{ cursor: "auto" }}></span>
                  </label>
                  <label className="switcher-control switcher-control-success">
                    <input type="checkbox" className="switcher-input" checked />
                    <span className="switcher-indicator" style={{ cursor: "auto" }}></span>
                  </label>
                </div>
              </header>
              <div className="AnswersKey__example-form">
                <p className="mb-1">Przykładowy formularz odpowiedzi:</p>
                <div className="border border-white p-3">
                  <AnswersKey />
                </div>
              </div>
            </div>
          </section>
        </div>
      }
    </div>
  );
}

export default FormAddSection;
