import React, { useState } from "react";
import PropTypes from "prop-types";

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
        required
      ></textarea>
    </div>
  );
};

OpenAnswer.propTypes = {
  id: PropTypes.number,
  data: PropTypes.object.isRequired,
  changeOpenAnswerText: PropTypes.func,
};

export default OpenAnswer;
