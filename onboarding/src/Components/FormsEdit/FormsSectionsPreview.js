import React from "react";
import parse from "html-react-parser";

function FormsSectionsPreview({ section }) {
  const answersList = (section.type !== "osa" && section.type !== "msa") ? [] : section.data.map((answer, i) => {
    let keyId = (typeof answer.id !== 'undefined') ? answer.id : "_" ;
    keyId = `answ-${keyId}-${section.id}-${i}`;

    return (
      <tr key={ keyId } className="FormsEdit__tr">
        <td className="FormsEdit__td d-flex justify-content-between align-items-center pr-0">
          <div className="w-100">
              <div
                  className={`custom-control custom-control-inline custom-${
                      section.type === "osa" ? "radio": "checkbox"}`
                  }
              >
                  <input
                      id={ keyId }
                      className="custom-control-input"
                      type={section.type === "osa" ? "radio": "checkbox"}
                  />
                  <label className="custom-control-label" htmlFor={ keyId }>
                      {answer.title}
                  </label>
              </div>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <section className="FormSection my-3">
        <header className="">
          <h2 className="FormSection__header">{ section.title }</h2>
        </header>
        <div className="FormSection__main">
          {(section.description && section.description !== "<br>")
            ? ( <div className="FormSection__header FormSection__header--dashed mb-3">{ parse(section.description) }</div>)
            : null
          }
          {section.type === "oa" ? (
            <textarea
              className="FormSection__input form-control"
              placeholder="Wpisz odpowiedź"
              rows="4"
              disabled
            ></textarea>
          ) : (
            <table className="table table-striped table-hover m-0">
              <tbody>{ answersList }</tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default FormsSectionsPreview;

