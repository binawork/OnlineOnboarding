import React from "react";
import parse from "html-react-parser";

function FormsSectionsPreview({ section }) {
  const answersList = (section.type !== "osa" && section.type !== "msa") ? [] : section.data.map((answer, i) => {
    let keyId = (typeof answer.id !== 'undefined') ? answer.id : "_" ;
    keyId = `answ-${keyId}-${section.id}-${i}`;

    return (
      <tr key={ keyId }>
        <td className="d-flex justify-content-between align-items-center pr-0">
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
      <section className="card my-3">
        <header className="card-header">
          <div>{ section.title }</div>
        </header>
        <div className="card-body">
          {(section.description && section.description !== "<br>")
            ? ( <>{ parse(section.description) }<hr /></>)
            : null
          }
          {section.type === "oa" ? (
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Wpisz odpowiedź"
                rows="4"
              ></textarea>
            </div>
          ) : (
            <table className="table table-striped table-hover">
              <tbody>{ answersList }</tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}

export default FormsSectionsPreview;

