import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import FormOpenText from "./OpenAnswerForm/FormOpenText";
import FormChoiceEdit from "./SingleChoiceForm/FormChoiceEdit";
import FormMultiChoiceEdit from "./MultiChoiceForm/FormMultiChoiceEdit";
import FormAddSection from "./FormAddSection";

function FormSections() {
  const [sections, setSections] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: send sections to Data Base
    console.log("zapisywanie");
  };

  /* Create new question */

  const handleAddSection = (type) => {
    const id = uuidv4();
    const formSection = {
      id: id,
      name: type + id,
      type: type,
      answRequired: true,
      title: "",
      description: "",
      choices: [
        { id: uuidv4(), title: "Odpowiedź 1" },
        { id: uuidv4(), title: "Odpowiedź 2" },
        { id: uuidv4(), title: "Odpowiedź 3" },
      ],
      checked: [],
      userOpenAnswer: "",
    };
    setSections([...sections, formSection]);
  };

  /* Functions to manage questions */

  const handleCopyForm = (e) => {
    e.preventDefault();
    const newId = uuidv4();
    const newForm = {};
    const index = sections.findIndex((form) => form.id === e.target.id);
    sections.map((form) => {
      if (form.id === (e.target.id).slice(5)) {
        newForm.id = newId;
        newForm.name = form.type + newId;
        newForm.type = form.type;
        newForm.answRequired = form.answRequired;
        newForm.title = form.title;
        newForm.description = form.description;
        newForm.choices = form.choices;
        newForm.checked = form.checked;
        newForm.userOpenAnswer = form.userOpenAnswer;
      }
      return form;
    });
    // slice() to get shallow copy of sections
    const forms = sections.slice(0);
    // splice() to put copied form at the right index (next after its origin)
    forms.splice(index + 1, 0, newForm);
    setSections(forms);
  };

  const handleDeleteForm = (id) => {
    setSections(sections.filter((form) => form.id != id));
  };

  const handleSwitcherChange = (e) => {
    const forms = sections.map((form) => {
      form.id === e.target.id
        ? form.answRequired === true
          ? (form.answRequired = false)
          : (form.answRequired = true)
        : form;
      return form;
    });
    setSections(forms);
  };

  const handleTitleChange = (e) => {
    const forms = sections.map((form) => {
      // slice(5) - because e.target.id = 'title' + id
      form.id === e.target.id.slice(5) 
      ? (form.title = e.target.value) 
      : form;
      return form;
    });
    setSections(forms);
  };

  // const handleDescriptionChange = (e) => {
  //   const content = e.target.nextSibling.children[2].children[3].innerHTML;
  //   // slice(5) - because id = 'descr' + id
  //   const id = (e.target.id).slice(5);
  //   // console.log('textarea: ', content)
  //   // console.log('id: ', id)
  //   const forms = sections.map((form) => {
  //     form.id === id
  //       ? (form.description = content)
  //       : form;
  //     return form;
  //   });
  //   // console.log('pytania: ', forms)
  //   setSections(forms);
  // };
  const handleDescriptionChange = (content, mdId) => {
    console.log('pytania przed: ', sections)
    console.log('textarea: ', content)
    // console.log('id: ', mdId.prevObject[0].previousElementSibling.id)
    const forms = sections.map((form) => {
      // slice(5) - because id = 'descr' + id
      form.id === (mdId)
        ? (form.description = content)
        : form;
      return form;
    });
    setSections(forms);
    console.log('pytania po: ', sections)
  };

  const onDragEnd = (result) => {
    // destination, source -> objects in which you can find the index of the destination and index of source item
    const { destination, source, reason } = result;
    // Not a thing to do...
    if (!destination || reason === "CANCEL") {
      return;
    }
    //If dorp an element to the same place, it should do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const pageSections = Object.assign([], sections);
    const droppedSection = sections[source.index];
    pageSections.splice(source.index, 1);
    pageSections.splice(destination.index, 0, droppedSection);

    setSections(pageSections);
  };

  /* Functions to manage question's answers */

  const handleAddAnswer = (e) => {
    e.preventDefault();
    const forms = sections.map((form) => {
      // slice(7) - because e.target.id = 'addansw' + id
      if (form.id === e.target.id.slice(7)) {
        const i = form.choices.length ? form.choices.length + 1 : 1;
        const choice = { id: uuidv4(), title: "Odpowiedź " + i };
        form.choices = [...form.choices, choice];
      }
      return form;
    });
    setSections(forms);
  };

  const handleDeleteAnswer = (e) => {
    e.preventDefault();
    const forms = sections.map((form) => {
      // slice(6) - because e.target.name = ('radios' || 'checks') + id
      if (form.id === e.target.name.slice(6)) {
        form.choices = form.choices.filter(
          (choice) => choice.id !== e.target.id.slice(3)
        );
      }
      return form;
    });
    setSections(forms);
  };

  const handleEditAnswer = (e) => {
    const forms = sections.map((form) => {
      // slice(6) - because e.target.name = ('radios' || 'checks')  + id
      if (form.id === e.target.name.slice(6)) {
        // slice(4) - because e.target.name = 'edit' + id
        form.choices = form.choices.map((choice) => {
          choice.title =
            choice.id === e.target.id.slice(4) ? e.target.value : choice.title;

          return choice;
        });
      }
      return form;
    });
    setSections(forms);
  };
  const handleEditOpenAnswer = (e) => {
    const forms = sections.map((form) => {
      // slice(6) - because e.target.name = 'answer'  + id
      form.userOpenAnswer =
        form.id === e.target.id.slice(6) ? e.target.value : form.userOpenAnswer;

      return form;
    });
    setSections(forms);
  };

  const handleChangeChecked = (e) => {
    const forms = sections.map((form) => {
      // slice(6) - because e.target.name = form.type + id
      if (form.id === e.target.name.slice(6)) {
        if (e.target.type === "radio") {
          form.checked = [e.target.id];
        } else if (e.target.type === "checkbox") {
          form.checked.includes(e.target.id)
            ? (form.checked = form.checked.filter(
                (checkedId) => checkedId !== e.target.id
              ))
            : (form.checked = [...form.checked, e.target.id]);
        } else {
          console.log(
            "Wrong type of answer sent to 'handleChangeChecked' function inside 'FormSections' component"
          );
        }
      }
      return form;
    });
    setSections(forms);
  };
  const handleChangeAnswersOrder = (id, sectionAnswers) => {
    const forms = sections.map((form) => {
      if (form.id === id) {
        form.choices = sectionAnswers;
      }
      return form;
    });
    setSections(forms);
  };

  return (
    <form>
      <div className="row">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="dp1">
            {(provided) => (
              <div
                className="col"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sections.map((form, index) => (
                  <Draggable
                    key={form.id}
                    draggableId={"draggable-" + form.id}
                    index={index}
                  >
                    {(provided) =>
                      form.type === "radios" ? (
                        <FormChoiceEdit
                          innerRef={provided.innerRef}
                          provided={provided}
                          key={form.id}
                          id={form.id}
                          name={form.name}
                          title={form.title}
                          description={form.description}
                          choices={form.choices}
                          checked={form.checked}
                          copyForm={handleCopyForm}
                          deleteForm={() => handleDeleteForm(form.id)}
                          answRequired={form.answRequired}
                          titleChange={(e) => handleTitleChange(e)}
                          descriptionChange={(id, content) => handleDescriptionChange(id, content)}
                          addAnswer={(e) => handleAddAnswer(e)}
                          deleteAnswer={(e) => handleDeleteAnswer(e)}
                          editAnswer={(e) => handleEditAnswer(e)}
                          changeChecked={(e) => handleChangeChecked(e)}
                          switcherChange={(e) => handleSwitcherChange(e)}
                          changeAnswersOrder={(id, sectionAnswers) =>
                            handleChangeAnswersOrder(id, sectionAnswers)
                          }
                        />
                      ) : form.type === "checks" ? (
                        <FormMultiChoiceEdit
                          innerRef={provided.innerRef}
                          provided={provided}
                          key={form.id}
                          id={form.id}
                          name={form.name}
                          title={form.title}
                          description={form.description}
                          choices={form.choices}
                          checked={form.checked}
                          copyForm={handleCopyForm}
                          deleteForm={() => handleDeleteForm(form.id)}
                          answRequired={form.answRequired}
                          titleChange={(e) => handleTitleChange(e)}
                          descriptionChange={(id, content) => handleDescriptionChange(id, content)}
                          addAnswer={(e) => handleAddAnswer(e)}
                          deleteAnswer={(e) => handleDeleteAnswer(e)}
                          editAnswer={(e) => handleEditAnswer(e)}
                          changeChecked={(e) => handleChangeChecked(e)}
                          switcherChange={(e) => handleSwitcherChange(e)}
                          changeAnswersOrder={(id, sectionAnswers) =>
                            handleChangeAnswersOrder(id, sectionAnswers)
                          }
                        />
                      ) : form.type === "opAnsw" ? (
                        <FormOpenText
                          innerRef={provided.innerRef}
                          provided={provided}
                          key={form.id}
                          id={form.id}
                          name={form.name}
                          title={form.title}
                          userAnswer={form.userOpenAnswer}
                          copyForm={handleCopyForm}
                          deleteForm={() => handleDeleteForm(form.id)}
                          answRequired={form.answRequired}
                          titleChange={(e) => handleTitleChange(e)}
                          descriptionChange={(id, content) => handleDescriptionChange(id, content)}
                          editOpenAnswer={(e) => handleEditOpenAnswer(e)}
                          switcherChange={(e) => handleSwitcherChange(e)}
                        />
                      ) : (
                        console.info("Wrong type of form")
                      )
                    }
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="col-auto">
          <div className="card-body">
            <FormAddSection
              handleClicks={{
                openText: () => handleAddSection("opAnsw"),
                singleChoice: () => handleAddSection("radios"),
                multiChoiceEdit: () => handleAddSection("checks"),
              }}
            />
            <div className="form-group">
              <div className="input-group-append">
                <button type="submit" className="btn btn-success" onClick={handleSubmit}>Zapisz pytania</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormSections;
