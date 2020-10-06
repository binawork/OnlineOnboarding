import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import FormOpenText from "./OpenAnswerForm/FormOpenText";
import FormChoiceEdit from "./SingleChoiceForm/FormChoiceEdit";
import FormMultiChoiceEdit from "./MultiChoiceForm/FormMultiChoiceEdit";
import FormAddSection from "./FormAddSection";

function FormSections() {
  const [form_sections, setForms] = useState([]);

  const handleAddSection = (type) => {
    const id = uuidv4();
    const formSection = {
      id: id,
      name: type + id,
      type: type,
      answRequired: true,
    };
    setForms([...form_sections, formSection]);
  };

  const handleCopyForm = (e) => {
    const newId = uuidv4();
    const newForm = {};
    const index = form_sections.findIndex(form => form.id === e.target.id);
    form_sections.map(form => {
      if(form.id === e.target.id) {
        newForm.id = newId;
        newForm.name = form.type + newId;
        newForm.type = form.type;
        newForm.answRequired = form.answRequired
      }
      return form;
    });
    const forms = form_sections.slice(0);
    forms.splice(index + 1, 0, newForm);
    setForms(forms);
    console.log(form_sections)
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
              copyForm={handleCopyForm}
              deleteForm={() => handleDeleteForm(form.id)}
              answRequired={form.answRequired}
              switcherChange={(e) => handleSwitcherChange(e)}
            />
          ) : form.type === "checks" ? (
            <FormMultiChoiceEdit
              key={form.id}
              id={form.id}
              name={form.name}
              copyForm={handleCopyForm}
              deleteForm={() => handleDeleteForm(form.id)}
              answRequired={form.answRequired}
              switcherChange={(e) => handleSwitcherChange(e)}
            />
          ) : form.type === "openAnswers" ? (
            <FormOpenText
              key={form.id}
              id={form.id}
              name={form.name}
              copyForm={handleCopyForm}
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
              openText: () => handleAddSection("openAnswers"),
              singleChoice: () => handleAddSection("radios"),
              multiChoiceEdit: () => handleAddSection("checks"),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FormSections;
