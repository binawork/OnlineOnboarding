import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import FormOpenText from "./OpenAnswerForm/FormOpenText";
import FormChoiceEdit from "./SingleChoiceForm/FormChoiceEdit";
import FormMultiChoiceEdit from "./MultiChoiceForm/FormMultiChoiceEdit";
import FormAddSection from "./FormAddSection";

function FormSections() {
  const [form_sections, setForms] = useState([]);

  const handleOpenText = () => {
    const id = uuidv4();
    const formSection = {
      id: id,
      name: "openAnswers" + id,
      type: "openAnswers",
      answRequired: true,
    };
    setForms([...form_sections, formSection]);
  };
  
  const handleChoiceEdit = () => {
    const id = uuidv4();
    const formSection = {
      id: id,
      name: "radios" + id,
      type: "radios",
      answRequired: true,
    };
    setForms([...form_sections, formSection]);
  };
  
  const handleMultiChoice = () => {
    const id = uuidv4();
    const formSection = {
      id: id,
      name: "checks" + id,
      type: "checks",
      answRequired: true,
    };
    setForms([...form_sections, formSection]);
  };

  const handleCopyForm = (e) => {
    console.log(e.target);

    // setForms([...form_sections, e.target]);
  };
  const handleDeleteForm = (id) => {
    setForms(form_sections.filter(form => form.id != id))
  };


  const handleSwitcherChange = (e) => {
    const forms = form_sections.map((form) => {
      form.id === e.target.id
        ? form.answRequired === true
          ? (form.answRequired = false)
          : (form.answRequired = true)
        : form;
      return form;
    });
    setForms(forms);
  };

  return (
    <div className="row">
      <div className="col">
        {form_sections.map((form) =>
          form.type === "radios" ? (
            <FormChoiceEdit
              key={form.id}
              id={form.id}
              name={form.name}
              copyForm={(e) => handleCopyForm(e)}
              deleteForm={() => handleDeleteForm(form.id)}
              answRequired={form.answRequired}
              switcherChange={(e) => handleSwitcherChange(e)}
            />
          ) : form.type === "checks" ? (
            <FormMultiChoiceEdit
              key={form.id}
              id={form.id}
              name={form.name}
              copyForm={(e) => handleCopyForm(e)}
              deleteForm={() => handleDeleteForm(form.id)}
              answRequired={form.answRequired}
              switcherChange={(e) => handleSwitcherChange(e)}
            />
          ) : form.type === "openAnswers" ? (
            <FormOpenText
              key={form.id}
              id={form.id}
              name={form.name}
              copyForm={(e) => handleCopyForm(e)}
              deleteForm={() => handleDeleteForm(form.id)}
              answRequired={form.answRequired}
              switcherChange={(e) => handleSwitcherChange(e)}
            />
          ) : (
            console.info("Wrong type of form")
          )
        )}
      </div>
      <div className="col-auto">
        <div className="card-body">
          <FormAddSection
            handleClicks={{
              openText: handleOpenText,
              singleChoice: handleChoiceEdit,
              multiChoiceEdit: handleMultiChoice,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FormSections;
