import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
//import PropTypes from "prop-types";


const SectionForm = ({ section, answerId, answerData, setAnswer }) => {
  const [inputs, setInputs] = useState([]);
  const [selection, setPrevious] = useState({prev: null, isRadio: section.type === "osa"});


  const toggleChecked = function(e){
      // https://jsfiddle.net/crp6em1z/;
      let inp = e.target||e.srcElement, otherClicked = true;
      /*if(selection.prev){
          otherClicked = selection.prev.value !== inp.value;
      }*/

      if(otherClicked/* || selection.isRadio === false*/){
          let j = parseInt(inp.value, 10);
          if(j < 0 || j >= section.data.length)
              return;

          let sectionData = section.data;
          /* when selection.isRadio  ->  answerData=[{id: sectionData[inp.value].id, text: sectionData[inp.value].title}]
           * else if checked ->  answerData.push({id: sectionData[inp.value].id, text: sectionData[inp.value].title})
           * else  ->  remove {id: sectionData[inp.value].id, text: sectionData[inp.value].title} from answerData
           */
          let newAnswerData = answerData, element = {id: sectionData[j].id, text: sectionData[j].title};
          if(element.id == null)
              element.id = -1;

          if(selection.isRadio)
              newAnswerData = [element];
          else if(inp.checked)// (always true when selection.isRadio);
              newAnswerData.push(element);
          else {
              let i = newAnswerData.length - 1;
              for(; i >= 0; i--){
                  if(newAnswerData[i].id == element.id){
                      newAnswerData.splice(i, 1);
                      break;
                  }
              }
          }
          setAnswer(answerId, newAnswerData);
      }

  };


  useEffect(() => {
      let inputs2 = [], name = 'section-'+section.id,
          i, count = section.data?.length, isChecked;

      for(i = 0; i < count; i++){
          isChecked = false;
          for(let j = answerData.length - 1; j >= 0; j--){
              if(answerData[j].id == section.data[i].id || answerData[j].text === section.data[i].title){
                  isChecked = true;
                  break;
              }
          }

          inputs2.push(<>
                <input className="custom-control-input"
                    id={section.id + "-" + i}
                    name={ name }
                    type={ selection.isRadio ? "radio" : "checkbox" }
                    value={ i }
                    onChange={ toggleChecked }
                    required={ selection.isRadio }
                    defaultChecked={ isChecked }
                />
                <label className="custom-control-label w-100" style={{cursor: "pointer"}} htmlFor={section.id + "-" + i}>
                   {section.data[i].title}
                </label>
              </>);
      }
      setInputs(inputs2);
  }, [section, answerId]);


  return (
    <>
      {inputs.map( (element) => (
    <tr key={ uuidv4() }>
      <td className="d-flex justify-content-between align-items-center pr-0">
        <div className="w-100">
          <div
            className={`w-100 custom-control custom-control-inline custom-${selection.isRadio ? "radio" : "checkbox"}`}>
            { element }
          </div>
        </div>
      </td>
    </tr>
      ) )
      }
    </>
  );
};


export default SectionForm;

