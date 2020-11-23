import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FormSection from "../FormsEdit/FormSection";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import FormDescription from "./FormDescription";
import FormAddSection from "./FormAddSection";
// import FormSectionsAPI, { saveSections, dndFormSections } from "../hooks/FormSectionsAPI";
import FormSectionsAPI from "../hooks/FormSectionsAPI";
import LoggedUser from "../hooks/LoggedUser.js";

function FormsEditPage({ location, match }) {
  // const [countUpdate, update] = useState(0);
  const [maxOrder, updateMaxOrder] = useState(0);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const pageID = match.params.form_id;
  console.log(sections);

  useEffect(() => {
    FormSectionsAPI.getAllTimeboxes(pageID)
      .then((response) => {
        setSections(response);
        //         const sortedResult = filteredResult.sort((a, b) => a.order - b.order);
        const orders = response.map((item) => item.order);
        updateMaxOrder(response.length);
        console.log("orders", orders);
        console.log("get result: ", response);
      })
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setLoading(false));
  }, []);

  const updateSections = () => {
    // update(countUpdate + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // saveSections(sections);
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

    const destinationSection = sections[destination.index];
    const droppedSection = sections[source.index];

    // dndFormSections(sections, droppedSection, destinationSection, updateSections);

    const pageSections = Object.assign([], sections);
    pageSections.splice(source.index, 1);
    pageSections.splice(destination.index, 0, droppedSection);
    setSections(pageSections);
  };

  return (
    <div className="app">
      <header className="app-header app-header-dark">
        <Navbar loggedUser={loggedUser} />
      </header>
      <LeftMenu packageId={packageIdRef.current} loggedUser={loggedUser} />
      <main className="app-main">
        <div className="wrapper">
          <div className="page has-sidebar-expand-xl">
            <div className="page-inner">
              <PageAddressBar
                page={"Formularz / Edytuj"}
                loggedUser={loggedUser}
              />{" "}
              <FormDescription location={location} pageId={pageID} />
              <section className="page-section">
                <header className="card-header">Sekcje strony</header>
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
                            {loading ? (
                              <div className="p-3">Ładowanie...</div>
                            ) : null}
                            {errorMessage !== "" ? (
                              <div className="p-3">{errorMessage}</div>
                            ) : (
                              sections.map((section, index) => (
                                <Draggable
                                  key={section.id}
                                  draggableId={"draggable-" + section.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <FormSection
                                      provided={provided}
                                      innerRef={provided.innerRef}
                                      order={section.order}
                                      id={section.id}
                                      name={section.type + section.id}
                                      title={section.title}
                                      description={section.description}
                                      type={section.type}
                                      sections={sections}
                                      setSections={setSections}
                                      updateSections={updateSections}
                                    />
                                  )}
                                </Draggable>
                              ))
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <div className="col-auto">
                      <FormAddSection
                        updateSections={updateSections}
                        maxOrder={maxOrder}
                        pageId={pageID}
                      />
                      <div className="form-group">
                        <div className="input-group-append">
                          <button
                            type="submit"
                            className="btn btn-success"
                            onClick={handleSubmit}
                          >
                            Zapisz pytania
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FormsEditPage;
