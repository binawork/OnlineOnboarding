import React, { useEffect, useState } from "react";
import uuid from "uuid";
import AnswersLegend from "../EmployeeAnswersView/AnswersLegend";

function FormAddSection({
  setSections,
  sections,
  updateMaxOrder,
  maxOrder,
  pageId,
  setEditMode,
  editMode
}) {
  const [showLegend, setShowLegend] = useState(false);
  const [showButtons, setShowButtons] = useState();
  const [iconButtons, setIconButtons] = useState(false);
  const [buttonOpen, setButtonOpen] = useState();
  const [buttonSingleAnsw, setButtonSingleAnsw] = useState();
  const [buttonMultiAnsw, setButtonMultiAnsw] = useState();

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleWindowResize = () => {
    setIconButtons(window.innerWidth > 810
      ? true
      : false
    )
    setButtonOpen(window.innerWidth > 1024
      ? <><i className="bi bi-list mr-2"/>Pytanie otwarte</>
      : <i className="bi bi-list" />
      
    );
    setButtonSingleAnsw(window.innerWidth > 1024
      ? <><i className="bi bi-circle mr-2"/>Jednokrotny wybór</>
      : <i className="bi bi-circle"></i>
      
    );
    setButtonMultiAnsw(window.innerWidth > 1024
      ? <><i className="bi bi-check-square mr-2"/>Wielokrotny wybór</>
      : <i className="bi bi-check-square"></i>
      
    );
  }

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
    setShowButtons(false);
  };

  const handleChangeMode = (e) => {
    e.preventDefault();
    setEditMode(!editMode);
  }

  const handleShowButtons = () => {
    setShowButtons(!showButtons);
  }

  return (
    <>
    <div className="FormAddSection">
      <div className={ `FormAddSection__wrapper ${showButtons
            ? "FormAddSection__wrapper--resize"
            : ""}` 
          }>
        <header className="FormAddSection__header">+ Dodaj</header>
        <div className="FormAddSection__body">
          <div className={ `${showButtons
            ? "w-100"
            : "FormAddSection__button-add--hide"}` 
          }>
              <button
                className="FormAddSection__button FormAddSection__button-add btn"
                onClick={(e) => handleAddSection(e, "oa")}
                title="Pytanie otwarte"
              >
                { buttonOpen }
              </button>
          </div>
          <div className={ `${showButtons
            ? "w-100"
            : "FormAddSection__button-add--hide"}` 
          }>
              <button
                className="FormAddSection__button FormAddSection__button-add btn"
                onClick={(e) => handleAddSection(e, "osa")}
                title="Jednokrotny wybór"
              >
                { buttonSingleAnsw }
              </button>
          </div>
          <div className={ `${showButtons
            ? "w-100"
            : "FormAddSection__button-add--hide"}`
          }>
              <button
                className="FormAddSection__button FormAddSection__button-add btn"
                onClick={(e) => handleAddSection(e, "msa")}
                title="Wielokrotny wybór"
              >
                { buttonMultiAnsw }
              </button>
          </div>
          <div className="FormAddSection__plus form-group" title="Dodaj pytanie">
            <div className="FormAddSection__plus-wrapper col">
              <button className="FormAddSection__plus-button" type="button" onClick={ handleShowButtons }>
                { showButtons
                  ? <i className="FormAddSection__plus-icon bi bi-dash-circle"></i>
                  : <i className="FormAddSection__plus-icon bi bi-plus-circle"></i>
                }
                
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="FormAddSection__buttons-wrapper form-group">
        <div className="FormAddSection__buttons-box input-group-append">
          <button
            type="submit"
            className="FormAddSection__button FormAddSection__button--save btn"
            title="Zapisz pytania"
          >
            <span className={`${iconButtons ? "" : "FormAddSection__button-content"}`}>Zapisz pytania</span>
          </button>
          <button
            className="FormAddSection__button FormAddSection__button--preview btn"
            onClick={ handleChangeMode }
            title="Podgląd"
          >
            <span className={`${iconButtons ? "" : "FormAddSection__button-content"}`}>
              { editMode
                ? "Podgląd"
                : "Edytuj"
              }
            </span>
          </button>
        </div>
        <button
          type="button"
          className="FormAddSection__button FormAddSection__button--legend btn"
          title="Legenda"
          onClick={() => setShowLegend(!showLegend)}
        >
            <span className={`${iconButtons ? "" : "FormAddSection__button-content"}`}>
              Legenda
            </span>
        </button>
      </div>
    </div>
      { showLegend && 
        <div className="Modal modal modal-alert fade show d-flex align-items-center" onClick={() => setShowLegend(!showLegend)}>
          <section className="Modal__dialog">
            <div className="Modal__content">
              <header>
                <p className="text-uppercase text-center">Legenda</p>
                <p className="text-center">Przesuwając suwak w prawo w szablonie odpowiedzi zaznaczasz prawidłowe odpowiedzi. Dzięki temu szybciej ocenisz feedback.</p>
                <div className="d-flex flex-column align-items-center mb-3">
                  <label className="switcher-control switcher-control-success mb-2">
                    <span className="switcher-input" />
                    <span className="switcher-indicator border border-white" style={{ cursor: "auto" }}></span>
                  </label>
                  <label className="switcher-control switcher-control-success">
                    <input type="checkbox" className="switcher-input" defaultChecked />
                    <span className="switcher-indicator" style={{ cursor: "auto" }}></span>
                  </label>
                </div>
              </header>
              <div className="AnswersLegend__example-form">
                <p className="mb-1">Przykładowy formularz odpowiedzi:</p>
                <div className="border border-white p-3">
                  <AnswersLegend />
                </div>
              </div>
            </div>
          </section>
        </div>
      }
      </>
  );
}

export default FormAddSection;
