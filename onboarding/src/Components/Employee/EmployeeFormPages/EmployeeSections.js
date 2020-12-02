import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FormOpenAnswer from "../../FormsEdit/FormOpenAnswer";
import FormChoiceAnswer from "../../FormsEdit/FormChoiceAnswer";
import FormMultiChoiceAnswer from "../../FormsEdit/FormMultiChoiceAnswer";
import FormSectionsAPI from "../../hooks/FormSectionsAPI";

const EmployeeSections = ({ pageId }) => {
  const [sections, setSections] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    FormSectionsAPI.getAllSections(pageId)
      .then((response) => {
        const sortedResponse = response.sort((a, b) => a.order - b.order);
        setSections(sortedResponse);
      })
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setLoading(false));

    FormSectionsAPI.getAllAnswers()
      .then((response) => {
        if (response.length === 0) return;
        const sortedAnswers = response.sort((a, b) => a.id - b.id);
        setAnswers(sortedAnswers);
      })
      .catch((error) => setErrorMessage(error.message));
  }, []);
  console.log(sections, answers);

  return (
    <>
      {loading ? (
        <div className="p-3">Ładowanie...</div>
      ) : errorMessage !== "" ? (
        <div className="p-3">{errorMessage}</div>
      ) : (
        sections.map((section) => (
          <section key={uuidv4()} className="card my-3">
            <header className="card-header">
              <div>{section.title}</div>
            </header>
            <div className="card-body">
              <p>{section.description}</p>
              <hr />
              <EmployeeAnswers
                sectionId={section.id}
                answers={answers}
                type={section.type}
              />
            </div>
          </section>
        ))
      )}
    </>
  );
};

export default EmployeeSections;
