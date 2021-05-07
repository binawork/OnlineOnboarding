import React, { useState } from "react";
import PropTypes from "prop-types";


const OpenAnswer = ({ id, index, data, changeOpenAnswerText, readOnly }) => {
  let text = "";
  if(typeof data === 'string' || data instanceof String)
    text = data;
  else if(Array.isArray(data) && data.length > 0)
    text = data[0];

  const [answerText, setAnswerText] = useState(text);

  const changeAnswerText = (e) => {
    setAnswerText(e.target.value);
  };

  const updateAnswerText = function(e){
    changeOpenAnswerText(index, e.target.value);
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
        onBlur={ updateAnswerText }
        disabled={ readOnly !== null && typeof readOnly !== 'undefined' ? readOnly : true }
        required
      ></textarea>
    </div>
  );
};

OpenAnswer.propTypes = {
  id: PropTypes.number,
  index: PropTypes.number,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  changeOpenAnswerText: PropTypes.func,
};

export default OpenAnswer;
