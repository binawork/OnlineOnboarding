import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import AnswerRow from "./AnswerRow";

import FormSectionsAPI from "../hooks/FormSectionsAPI";

function SectionAnswers({ sectionId, answers, setAnswers, name, type }) {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    FormSectionsAPI.getAllAnswers()
      .then((response) => {
        const sectionAnswers = response.filter(
          (answer) => answer.section === sectionId
        );
        setAnswers(sectionAnswers);
        //         const sortedResult = filteredResult.sort((a, b) => a.order - b.order);
        // console.log("get answer result: ", response);
      })
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }, []);

  const answersList = answers.map((answer, index) => {
    try {
      if (type === "osa" || type === "msa") {
        return (
          <Draggable
            key={answer.id}
            draggableId={"draggable-" + answer.id}
            index={index}
          >
            {(provided) => (
              <AnswerRow
                innerRef={provided.innerRef}
                provided={provided}
                answerId={answer.id}
                name={name}
                text={answer.data}
                type={type}
                // deleteAnswer={deleteAnswer}
                // editAnswer={editAnswer}
              />
            )}
          </Draggable>
        );
      } else if (type !== "oa") {
        throw new Error(
          "Wrong type of section. The proper section type is one of: 'oa', 'osa' or 'msa'."
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  return (
    <>
      {loading ? (
        <tr className="p-3">
          <td>Ładowanie...</td>
        </tr>
      ) : null}
      {errorMessage !== "" ? (
        <tr className="p-3">
          <td>{errorMessage}</td>
        </tr>
      ) : (
         answersList 
      )}
    </>
  );
}

export default SectionAnswers;
