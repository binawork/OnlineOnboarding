import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import FormSection from "./FormSection";
import PageAddressBar from "../PageAddressBar";
import FormDescription from "./FormDescription";
import FormAddSection from "./FormAddSection";
import FormSectionsAPI from "../hooks/FormSectionsAPI";
import { useLocation, useParams } from "react-router-dom";

function FormsEditPage() {
  const location = useLocation();
  const { form_id:formId } = useParams();

  let formName;
  let description;
  let link;
  // let loading = true;
  // let errorMessage;

  if(location.state) {
    formName = location.state.formName;
    description = location.state.description;
    link = location.state.link;
  } else {
    // const { packageAndForms, isLoading, error } = fetchOnePackageAndForms(packageId, countUpdate);

    // if(packageAndForms) {
    //   packageData = packageAndForms;
    //   pages = packageAndForms?.page_set.sort((a,b) =>  b.id - a.id);
    //   errorMessage = error;
    //   loading = isLoading;
    // };
  }
  

  const [maxOrder, updateMaxOrder] = useState(0);
  const [sections, setSections] = useState([]);
  //const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [update, setUpdate] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let mounted = true;
    FormSectionsAPI.getAllSections(formId)
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

    /*FormSectionsAPI.getAllAnswers()
      .then((response) => {
        if (response.length === 0) return;
        const sortedAnswers = response.sort((a, b) => a.id - b.id);
        setAnswers(sortedAnswers);
      })
      .catch((error) => setErrorMessage(error.message));*/

    setUpdate(false);

    return function cleanup() {
      mounted = false;
    };
  }, [update]);

  useEffect(() => {
    // Show info "Zapisano zmiany" for 3sec when the changes were saved
    if (saved) {
      const timer = setTimeout(setSaved, 3000, false);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [saved]);

  const handleSave = (e) => {
    e.preventDefault();
    FormSectionsAPI.saveAll(sections/*, answers*/)
      .catch((error) => setErrorMessage(error.message))
      .then(() => {
        setUpdate(true);
        setSaved(true);
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
    <div className="page-inner">
      <PageAddressBar page={"Formularz / Edytuj"} />
      { loading && <p>Ładowanie...</p> }
      { errorMessage && <p>{ errorMessage }</p> }

      <FormDescription location={location} pageId={formId} />
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
                pageId={formId}
              />
            </div>
          </div>
        </form>
      </section>
      {saved ? (
        <div
          className="fixed-bottom d-flex justify-content-center show-and-hide"
          style={{ display: "fixed-bottom", left: "240px" }}
        >
          <div
            className="m-2 p-2"
            style={{
              width: "150px",
              backgroundColor: "rgba(226, 232, 238, 0.57)",
              color: "black",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            Zapisano zmiany
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default FormsEditPage;
