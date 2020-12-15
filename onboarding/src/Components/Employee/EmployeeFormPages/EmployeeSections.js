import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import FormSectionsAPI from "../../hooks/FormSectionsAPI";
import EmployeeAnswers from "./EmployeeAnswers";
import ModalWarning from "../../ModalWarning";

const EmployeeSections = ({ pageId }) => {
  const [sections, setSections] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationModal, setModal] = useState({ id: 0, modal: <></> });

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

  const toggleChecked = (e) => {
    const toggle = answers.map((answer) => {
      if (
        e.target.type === "radio" &&
        answer.section == e.target.name.slice(8)
      ) {
        answer.id == e.target.id
          ? (answer.data.is_checked = true)
          : (answer.data.is_checked = false);
      } else if (answer.id == e.target.id)
        answer.data.is_checked = !answer.data.is_checked;
      return answer;
    });
    setAnswers(toggle);
  };

  const changeOpenAnswerText = (e) => {
    const updatedAnswers = answers.map((answer) => {
      if (answer.id == e.target.id) {
        answer.data.title = e.target.value;
      }
      return answer;
    });
    setAnswers(updatedAnswers);
  };

  const saveAnswers = (e) => {
    e.preventDefault();
    FormSectionsAPI.saveAnswers(answers)
      .catch((error) => setErrorMessage(error.message))
      .then(() => {
        popUpConfirmationModal();
      });
  };

  const hideModal = () => {
    setModal({ id: 0, modal: <></> });
  };

  const popUpConfirmationModal = () => {
    setModal({
      id: 0,
      modal: (
        <ModalWarning
          handleAccept={hideModal}
          title="Potwierdzenie wysłania"
          message="Wysłano odpowiedzi"
          id={0}
          show={true}
          acceptText="Ok"
        />
      ),
    });
  };

  return (
    <form onSubmit={saveAnswers}>
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
              {section.description ? parse(section.description) : <></>}
              <EmployeeAnswers
                sectionAnswers={answers.filter(
                  (answer) => answer.section === section.id
                )}
                type={section.type}
                name={`section-${section.id}`}
                toggleChecked={toggleChecked}
                changeOpenAnswerText={changeOpenAnswerText}
              />
            </div>
          </section>
        ))
      )}
      <button type="submit" className="btn btn-success mr-3">
        Wyślij odpowiedzi
      </button>
      {confirmationModal.modal}
    </form>
  );
};

EmployeeSections.propTypes = {
  pageId: PropTypes.number.isRequired,
};

export default EmployeeSections;
