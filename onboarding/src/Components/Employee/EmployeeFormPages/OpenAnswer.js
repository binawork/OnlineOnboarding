import React, { useState } from "react";

const OpenAnswer = ({ id, data, changeOpenAnswerText }) => {
  const [answerText, setAnswerText] = useState(data.title);

  const changeAnswerText = (e) => {
    setAnswerText(e.target.value);
  };

  return (
    <div key={id} className="form-group">
      <textarea
        id={id}
        className="form-control"
        placeholder="Wpisz odpowiedź"
        rows="4"
        value={answerText}
        onChange={changeAnswerText}
        onBlur={changeOpenAnswerText}
      ></textarea>
    </div>
  );
};

export default OpenAnswer;
