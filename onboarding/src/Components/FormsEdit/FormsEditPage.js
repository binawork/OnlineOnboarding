import React, { useState, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";


import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import FormDescription from "./FormDescription";
import FormAddSection from "./FormAddSection";
import FormSectionsAPI from "../hooks/FormSectionsAPI";
import LoggedUser from "../hooks/LoggedUser.js";

function FormsEditPage({ location, match }) {
  console.log(location);
  console.log(match.params.form_id);
  const [countUpdate, update] = useState(0);
  const [maxOrder, updateMaxOrder] = useState(0);
  const [sections, setSections] = useState([]);
  const pageId = match.params.form_id;

  const updateSections = () => {
    update(countUpdate + 1);
  };

  const packageIdRef = useRef(0);
  if (match.params.package_id)
    packageIdRef.current = parseInt(match.params.package_id);

  let loggedUser;
  if (location.state) {
    loggedUser = location.state.loggedUser
      ? location.state.loggedUser
      : LoggedUser();
  } else loggedUser = LoggedUser();

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

    const destinationSection = qaList[destination.index];
    const droppedSection = qaList[source.index];

    // dndQnA(qaList, droppedSection, destinationSection, updateQnA);

    const pageSections = Object.assign([], qaList);
    pageSections.splice(source.index, 1);
    pageSections.splice(destination.index, 0, droppedSection);
    setSections(pageSections);
  };

  return (
    <div className="app">
      <header className="app-header app-header-dark">
        <Navbar loggedUser={loggedUser} /> {/* placeholder */}
      </header>
      <LeftMenu packageId={packageIdRef.current} loggedUser={loggedUser} />
      <main className="app-main">
        <div className="wrapper">
          <div className="page has-sidebar-expand-xl">
            <div className="page-inner">
              <PageAddressBar
                page={"Formularz / " + "Edytuj"}
                loggedUser={loggedUser}
              />{" "}
              {/* placeholder */}
              <FormDescription location={location} pageId={pageId} />
              <div className="page-section">
                <div className="card card-fluid">
                  <div className="card-header">Sekcje strony</div>
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
                              <FormSectionsAPI
                                count={countUpdate}
                                handleUpdate={updateSections}
                                updateMaxOrder={updateMaxOrder}
                                sections={sections}
                                setSections={setSections}
                              />
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
                              {/* <button
                                type="submit"
                                className="btn btn-success"
                                onClick={handleSubmit}
                              >
                                Zapisz pytania
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* <FormSections sections={sections} setSections={setSections} /> */}
                  {/* placeholder */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FormsEditPage;
