import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import FormSection from "./FormSection";
import PageAddressBar from "../PageAddressBar";
import FormDescription from "./FormDescription";
import FormAddSection from "./FormAddSection";
import FormSectionsAPI from "../hooks/FormSectionsAPI";
import { useLocation, useParams } from "react-router-dom";
import FormsEdit, { fetchFormData } from "../hooks/FormsEdit";
import { singleCombo } from "../hooks/Packages";
import { onDragEnd } from "../utils";
import ModalWarning from "../ModalWarning";
import "../../static/css/FormsEdit.scss";

function FormsEditPage() {
  const location = useLocation();
  const { form_id:formId } = useParams();
  const [maxOrder, updateMaxOrder] = useState(0);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [update, setUpdate] = useState(true);
  // const [saved, setSaved] = useState(false);
  const [packageTitle, setPackageTitle] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const { data:formData } = fetchFormData(formId);
  const { sections:sortedSections, loading:isLoading, errorMessage:error } = FormsEdit(formId, update);
  
  // Set title of package in navigation bar
  let title = singleCombo(formData?.package)?.title;
  if(location.state?.packageTitle && !packageTitle) setPackageTitle(location.state.packageTitle);
  
  useEffect(() => {
    title && setPackageTitle(title);
  }, [title]);
  // End of set title of package in navigation bar

  useEffect(() => {
    setSections(sortedSections);
    updateMaxOrder(sortedSections?.length);
    setLoading(isLoading);
    setErrorMessage(error);
  }, [sortedSections, isLoading, error]);

  const hideModal = () => {
    setShowSaveModal(false);
  };

  const updateUnsetAsNew = function(newSections){
    if(typeof newSections === 'undefined' || newSections === null)
      return;

    let newSections2 = newSections.map( (section) => {
      if(section.hasOwnProperty('isNew') )
        section.isNew = false;

      return section;
    });

    //setSections(newSections2);
    setSections( newSections2.sort((section1, section2) => section1.order - section2.order) );
  }

  const handleSave = (e) => {
    e.preventDefault();
    FormSectionsAPI.saveAll(sections, updateUnsetAsNew)
      .catch((error) => setErrorMessage(error.message))
      .then(() => {
        setUpdate(true);
        setShowSaveModal(true);
        // updateUnsetAsNew(result);
      });
  };

  return (
    <div className="page-inner">
      <PageAddressBar 
        page={ `Formularz: ${location.state?.title || formData?.title || ""}` } 
        previousPages={[ 
          {title: "Twoje wdrożenia", url: "/packages"}, 
          {title: `Katalog: ${packageTitle || ""}`, 
            url: `/package/${location.state?.packageId || formData?.package}`
          } 
        ]} 
      />
      <FormDescription formId={ formId } formData={ formData } />
      <section className="FormsEdit__sections page-section">
        <header className="FormsEdit__header card-header">Sekcje formularza</header>
        <form onSubmit={ handleSave }>
          <div className="row">
            <DragDropContext onDragEnd={(result) => onDragEnd(result, sections, setSections)}>
              <Droppable droppableId="dp1">
                {(provided) => (
                  <div
                    className="col"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    { loading &&  <div className="p-3">Ładowanie...</div> }
                    { errorMessage && <div className="p-3">{ errorMessage }</div> }
                    { sections && (
                      <FormSection
                        sections={ sections }
                        setSections={ setSections }
                        maxOrder={ maxOrder }
                        updateMaxOrder={ updateMaxOrder }
                        editMode={ editMode }
                      />
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div className="col-auto pl-0">
              <FormAddSection
                setSections={ setSections }
                sections={ sections }
                updateMaxOrder={ updateMaxOrder }
                maxOrder={ maxOrder }
                pageId={ formId }
                editMode={ editMode }
                setEditMode={ setEditMode }
              />
            </div>
          </div>
        </form>
      </section>
      {showSaveModal && (
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
      )}
      {/* {saved ? (
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
      )} */}
    </div>
  );
}

export default FormsEditPage;
