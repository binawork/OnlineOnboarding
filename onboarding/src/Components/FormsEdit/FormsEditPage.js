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
import ModalWarning from "../ModalWarning";

function FormsEditPage({ location, match }) {
  const loggedUser = location.state?.loggedUser ?? LoggedUser();
  const pageId = match.params.form_id;
  const packageIdRef = useRef(0);
  if (location.state)
    packageIdRef.current = location.state.packageId || 0;

  const [maxOrder, updateMaxOrder] = useState(0);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [update, setUpdate] = useState(true);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    let mounted = true;
    FormSectionsAPI.getAllSections(pageId)
      .then((response) => {
        const sortedResponse = response.sort((a, b) => a.order - b.order);
        for(let i = sortedResponse.length - 1; i >= 0; i--){
          if( !Array.isArray(sortedResponse[i].data) )
            sortedResponse[i].data = [];
        }

        setSections(sortedResponse);
        updateMaxOrder(response.length);
      })
      .catch((error) => setErrorMessage(error.message))
      .finally(() => setLoading(false));

    setUpdate(false);

    return function cleanup() {
      mounted = false;
    };
  }, [update]);

  const hideModal = () => {
    setShowSaveModal(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    FormSectionsAPI.saveAll(sections/*, answers*/)
      .catch((error) => setErrorMessage(error.message))
      .then(() => {
        setUpdate(true);
        setShowSaveModal(true);
      });
  };

  const onDragEnd = (result) => {
    // destination, source -> objects in which you can find the index of the destination and index of source item
    const { destination, source, reason } = result;
    // Not a thing to do...
    if (!destination || reason === "CANCEL") {
      return;
    }
    //If drop an element to the same place, it should do nothing
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
              <FormDescription location={location} pageId={pageId} />
              <section className="page-section">
                <header className="card-header">Sekcje formularza</header>
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
                                /*answers={answers}
                                setAnswers={setAnswers}*/
                                setSections={setSections}
                                maxOrder={maxOrder}
                                updateMaxOrder={updateMaxOrder}
                                editMode={ editMode }
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
                        /*setAnswers={setAnswers}
                        answers={answers}*/
                        updateMaxOrder={updateMaxOrder}
                        maxOrder={maxOrder}
                        pageId={pageId}
                        editMode={ editMode }
                        setEditMode={ setEditMode }
                      />
                    </div>
                  </div>
                </form>
                {showSaveModal ? (
                  <ModalWarning
                    handleAccept={ hideModal }
                    title={ "Zapisywanie sekcji formularza" }
                    message={
                      errorMessage
                        ? "Nie udało się zapisać"
                        : "Zmiany zostały pomyślnie zapisane"
                    }
                    show={ true }
                    acceptText="Ok"
                    id={ 0 }
                  />
                ) : null}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FormsEditPage;
