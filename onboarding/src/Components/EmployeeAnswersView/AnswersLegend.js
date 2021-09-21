import React from "react";

function AnswersLegend({ isSimple, showLegend, setShowLegend }) {
  return (
    <div className="AnswersLegend Modal modal modal-alert fade show d-flex align-items-center" onClick={() => setShowLegend(!showLegend)}>
      <section className="Modal__dialog">
        <div className="Modal__content">
          <header>
            <p className="text-uppercase text-center">Legenda</p>
            { !isSimple && <>
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
            </> }
          </header>
          <div className="AnswersLegend__example-form">
            <p className="mb-1">Przykładowy formularz odpowiedzi:</p>
            <div className="border border-white p-3">
              <div className="d-flex justify-content-around AnswersLegend__box">
                <div>
                  <p>Odpowiedź jednokrotnego wyboru</p>
                  <div className="d-flex align-items-center AnswersLegend__example">
                    <ul className="list-unstyled pr-4">
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__bullet" style={{ marginLeft: "42px" }}></span>
                        <i className="text-nowrap">odpowiedź 1</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__bullet" style={{ marginLeft: "42px" }}></span>
                        <i className="text-nowrap">odpowiedź 2</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__dot"></span>
                        <span className="AnswersLegend__bullet AnswersLegend__bullet--green"></span>
                        <i className="text-nowrap">odpowiedź 3</i>
                      </li>
                    </ul>
                    <p><b>Dobrze udzielona odpowiedź</b></p>
                  </div>
                  <div className="d-flex align-items-center AnswersLegend__example">
                    <ul className="list-unstyled pr-4">
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__bullet" style={{ marginLeft: "42px" }}></span>
                        <i className="text-nowrap">odpowiedź 1</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span 
                          className="AnswersLegend__bullet AnswersLegend__bullet--red"
                          style={{ marginLeft: "42px" }}></span>
                        <i className="text-nowrap">odpowiedź 2</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__dot"></span>
                        <span className="AnswersLegend__bullet"></span>
                        <i className="text-nowrap">odpowiedź 3</i>
                      </li>
                    </ul>
                    <p><b>Źle udzielona odpowiedź</b></p>
                  </div>
                  <div className="d-flex align-items-center AnswersLegend__example">
                    <ul className="list-unstyled pr-4">
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__bullet" style={{ marginLeft: "42px" }}></span>
                        <i className="text-nowrap">odpowiedź 1</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__bullet" style={{ marginLeft: "42px" }}></span>
                        <i className="text-nowrap">odpowiedź 2</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__dot"></span>
                        <span className="AnswersLegend__bullet"></span>
                        <i className="text-nowrap">odpowiedź 3</i>
                      </li>
                    </ul>
                    <p><b>Brak odpowiedzi</b></p>
                  </div>
                </div>

                <div>
                  <p>Odpowiedź wielokrotnego wyboru</p>
                  <div className="d-flex align-items-center AnswersLegend__example">
                    <ul className="list-unstyled pr-4">
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__dot"></span>
                        <span className="AnswersLegend__bullet AnswersLegend__bullet--green AnswersLegend__bullet--square"></span>
                        <i className="text-nowrap">odpowiedź 1</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span 
                          className="AnswersLegend__bullet AnswersLegend__bullet--square"
                          style={{ marginLeft: "42px" }}></span>
                        <i className="text-nowrap">odpowiedź 2</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__dot"></span>
                        <span className="AnswersLegend__bullet AnswersLegend__bullet--green AnswersLegend__bullet--square"></span>
                        <i className="text-nowrap">odpowiedź 3</i>
                      </li>
                    </ul>
                    <p><b>Dobrze udzielona odpowiedź</b></p>
                  </div>
                  <div className="d-flex align-items-center AnswersLegend__example">
                    <ul className="list-unstyled pr-4">
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__dot"></span>
                        <span className="AnswersLegend__bullet AnswersLegend__bullet--square"></span>
                        <i className="text-nowrap">odpowiedź 1</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span 
                          className="AnswersLegend__bullet AnswersLegend__bullet--red AnswersLegend__bullet--square"
                          style={{ marginLeft: "42px" }}></span>
                        <i className="text-nowrap">odpowiedź 2</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__dot"></span>
                        <span className="AnswersLegend__bullet AnswersLegend__bullet--green AnswersLegend__bullet--square"></span>
                        <i className="text-nowrap">odpowiedź 3</i>
                      </li>
                    </ul>
                    <p><b>Źle udzielona odpowiedź</b></p>
                  </div>
                  <div className="d-flex align-items-center AnswersLegend__example">
                    <ul className="list-unstyled pr-4">
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__dot"></span>
                        <span className="AnswersLegend__bullet AnswersLegend__bullet--square"></span>
                        <i className="text-nowrap">odpowiedź 1</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span 
                          className="AnswersLegend__bullet AnswersLegend__bullet--square"
                          style={{ marginLeft: "42px" }}></span>
                        <i className="text-nowrap">odpowiedź 2</i>
                      </li>
                      <li className="pb-1 d-flex flex-nowrap align-items-center">
                        <span className="AnswersLegend__dot"></span>
                        <span className="AnswersLegend__bullet AnswersLegend__bullet--square"></span>
                        <i className="text-nowrap">odpowiedź 3</i>
                      </li>
                    </ul>
                    <p><b>Brak odpowiedzi</b></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnswersLegend;
