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
import SaveInfo from "../SaveInfo";
import "../../static/css/FormsEdit.scss";

function FormsEditPage() {
  const location = useLocation();
  const { form_id:formId } = useParams();
  const [maxOrder, updateMaxOrder] = useState(0);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAutosave, setIsAutosave] = useState(false);
  const [saveOnDemand, setSaveOnDemand] = useState(false);
  const [packageTitle, setPackageTitle] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [sectionsCopy, setSectionsCopy] = useState([]);

  const { data:formData } = fetchFormData(formId);
  const { sections:sortedSections, loading:isLoading, errorMessage:error } = FormsEdit(formId);

  // Set title of package in navigation bar
  let title = singleCombo(formData?.package)?.title;
  if(location.state?.packageTitle && !packageTitle) setPackageTitle(location.state.packageTitle);
  
  useEffect(() => {
    title && setPackageTitle(title);
  }, [title]);
  // End of set title of package in navigation bar

  useEffect(() => {
    setSections(sortedSections);
    // Shallow copy an Array of Objects
    setSectionsCopy(JSON.parse(JSON.stringify(sortedSections)));
    updateMaxOrder(sortedSections?.length);
    setLoading(isLoading);
    setErrorMessage(error);
  }, [sortedSections, isLoading, error]);

  const showAutosaveInfo = () => {
    // Show info "Zapisano zmiany" for 3 sec. when the changes were saved
    if(saveOnDemand !== true) {
      setIsAutosave(true);
      const timer = setTimeout(() => {
          setIsAutosave(false);
      }, 3000);

      return () => {
          clearTimeout(timer);
      }
    };
  }
  useEffect(() => {
    // Compare two Arrays of Objects
    if(sections && sectionsCopy && JSON.stringify(Object.values(sections)) == JSON.stringify(Object.values(sectionsCopy))) return;
    if(sections && !sections.some(section => section.title === "") && saveOnDemand !== true) {
      setErrorMessage("");

      // Save changes after 10 sec. form last change
      const saveTimeout = setTimeout(
        () => {
          if(saveOnDemand !== true) {
            FormSectionsAPI.saveAll(sections, updateUnsetAsNew)
              .catch((error) => setErrorMessage(error.message))
              .then((result) => {
                // Shallow copy an Array of Objects
                setSectionsCopy(JSON.parse(JSON.stringify(result)));
                setSections(result);
              })
              .finally(() => {
                showAutosaveInfo();
              });
            }
          },
          10000
          );
      return () => clearTimeout(saveTimeout);
    } 
  }, [sections]);

  const hideModal = () => {
    setShowSaveModal(false);
    setSaveOnDemand(false);
  };
  
  const updateUnsetAsNew = function(newSections){
    if(typeof newSections === 'undefined' || newSections === null)
    return;
    
    let newSections2 = newSections.map( (section) => {
      if(section.hasOwnProperty('isNew') )
      section.isNew = false;
      
      return section;
    });

    setSectionsCopy(JSON.parse(JSON.stringify(newSections)));
    setSections( newSections2.sort((section1, section2) => section1.order - section2.order) );
  }

  const handleSave = (e) => {
    e.preventDefault();
    setIsAutosave(false);
    setSaveOnDemand(true);
    FormSectionsAPI.saveAll(sections, updateUnsetAsNew)
      .catch((error) => setErrorMessage(error.message))
      .then((result) => {
        setShowSaveModal(true);
        updateUnsetAsNew(result);
      });
  };

  return (
    <div className="page-inner">
      <PageAddressBar 
        page={ `Rozdział: ${location.state?.title || formData?.title || ""}` } 
        previousPages={[ 
          {title: "Twoje wdrożenia", url: "/packages"}, 
          {title: `Katalog: ${packageTitle || ""}`, 
            url: `/package/${location.state?.packageId || formData?.package}`
          } 
        ]} 
      />
      <FormDescription formId={ formId } formData={ formData } />
      <section className="FormsEdit__sections">
        <header className="FormsEdit__header">Sekcja pytań i odpowiedzi</header>
        <form onSubmit={ handleSave }>
          <div className="row">
            <DragDropContext onDragEnd={(result) => onDragEnd(result, sections, setSections)}>
              <Droppable droppableId="dp1">
                {(provided) => (
                  <div
                    className="FormsEdit__column col"
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
            <div className="FormsEdit__column col-auto pl-0">
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
      {isAutosave && (
        <SaveInfo message={errorMessage ? "Nie udało się zapisać - któreś z pól może zawierać za dużo znaków." : "Zapisano zmiany"} />
      )}
      {showSaveModal && saveOnDemand && (
        <ModalWarning
          handleAccept={ hideModal }
          title={ "Zapisywanie sekcji rozdziału" }
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
    </div>
  );
}

export default FormsEditPage;
