import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import FormSection from "./FormSection";
import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import FormDescription from "./FormDescription";
import FormAddSection from "./FormAddSection";
import FormSectionsAPI from "../hooks/FormSectionsAPI";
import LoggedUser from "../hooks/LoggedUser.js";

function FormsEditPage({ location, match }) {
  const loggedUser = location.state?.loggedUser ?? LoggedUser();
  const [maxOrder, updateMaxOrder] = useState(0);
  const [sections, setSections] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [update, setUpdate] = useState(true);
  const pageID = match.params.form_id;
  const packageIdRef = useRef(0);
  if (match.params.package_id)
    packageIdRef.current = parseInt(match.params.package_id);

  useEffect(() => {
    FormSectionsAPI.getAllSections(pageID)
      .then((response) => {
        const sortedResponse = response.sort((a, b) => a.order - b.order);
        setSections(sortedResponse);
        updateMaxOrder(response.length);
      })
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setLoading(false));

    FormSectionsAPI.getAllAnswers()
      .then((response) => {
        if (response.length === 0) return;
        const sortedAnswers = response.sort((a, b) => a.id - b.id);
        setAnswers(sortedAnswers);
      })
      .catch((error) => setErrorMessage(error.message));
      
    setUpdate(false);
  }, [update]);

  const handleSave = (e) => {
    e.preventDefault();
    FormSectionsAPI.saveAll(sections, answers, setUpdate).catch((error) =>
      setErrorMessage(error.message)
    );
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

    const droppedSection = sections[source.index];
    const pageSections = [...sections];
    pageSections.splice(source.index, 1);
    pageSections.splice(destination.index, 0, droppedSection);

    const updatedList = pageSections.map((section, index) => {
      section.order = index + 1;
      return section;
    });

    setSections(updatedList);
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
                <form onSubmit={handleSave}>
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
                              <FormSection
                                sections={sections}
                                answers={answers}
                                setAnswers={setAnswers}
                                setSections={setSections}
                                maxOrder={maxOrder}
                                updateMaxOrder={updateMaxOrder}
                              />
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    <div className="col-auto">
                      <FormAddSection
                        setSections={setSections}
                        sections={sections}
                        setAnswers={setAnswers}
                        answers={answers}
                        updateMaxOrder={updateMaxOrder}
                        maxOrder={maxOrder}
                        pageId={pageID}
                      />
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
