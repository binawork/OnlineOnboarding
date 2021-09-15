import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { savePageDetails, getFilesForPage, removePageFile, addNewFiles } from "../hooks/FormsEdit";
import ModalWarning from "../ModalWarning";
import { isValidUrl } from "../utils";
import bookOpenedIcon from "../../static/icons/book-opened.svg";
import trashIcon from "../../static/icons/trash.svg";


const FormDescription = ({ formId, formData }) => {
  const formFilesRef = useRef();
  const location = useLocation();
  const [formName, setFormName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [saveModal, setSaveModal ] = useState(<></>);
  const [formFiles, updateFormFiles] = useState([]);
  const [filesToSend, appendFileToSend] = useState([]);
  const [filesToSendTable, updateFileToSendTable] = useState([]);
  const [uploadingFilesProgress, updateUploadingProgress] = useState(true);// array of progresses of files or true if there is no files and list can be updated;


  useEffect(() => {
    if(location.state && !formName) {
      location.state.formName && setFormName(location.state.formName);
      location.state.description && setDescription(location.state.description);
      location.state.link && setLink(location.state.link);
    } else {
      if(formData && !formName) {
        formData.title && setFormName(formData.title);
        formData.description && setDescription(formData.description);
        formData.link && setLink(formData.link);
      }
    }
  }, [formData]);

  useEffect(() => {
    if(uploadingFilesProgress === true){
      let abortCont = getFilesForPage(formId, arrayOfFilesToTable, arrayOfFilesToTable);
      updateFileToSendTable([]);// remove list of un-uploaded files;
      return () => abortCont.abort();
    } else if(updateUploadingProgress && Object.keys(updateUploadingProgress).length > 0){

      let filesToSendNewTable = [], percentage;
      Object.keys(updateUploadingProgress).forEach( (fileName) => {
        percentage = progressCopy[fileName].loaded / progressCopy[fileName].total * 100.0;
        percentage = parseFloat(percentage).toFixed(2);
        filesToSendNewTable.push(<div key={ fileName } file={ fileName }>{ fileName } | { percentage }%</div>);
      });

      updateFileToSendTable(filesToSendNewTable);
    }
  }, [formId, uploadingFilesProgress]);


  const arrayOfFilesToTable = (files) => {
    let tableFiles = [];
    if(typeof files === 'string' || files instanceof String){
      tableFiles.push(<div key={ 0 }>{ files }</div>);
      updateFormFiles(tableFiles);
      return;
    }

    let row, button, link;
    files.forEach((element) => {
      button = <button value={ element.id } className="btn" onClick={ popUpAskForDeleteFile }><img src={ trashIcon } alt="Remove file" /></button>
      link = <a href={ element.data_file }>{ element.name } ({ element.size } kB)</a>
      row = <div key={ element.id }>{ link } | { button }</div>
      tableFiles.push(row);
    });
    updateFormFiles(tableFiles);
  };

  const openedFilesToTable = (openedFiles) => {
    let openedFilesDOM = [], rmButton;
    openedFiles.forEach((file, index) => {
      if(!file.name || !file.size)
        return;

      rmButton = <button value={ file.name } className="btn" onClick={ removeFromOpened }><img src={ trashIcon } alt="Remove file" /></button>
      openedFilesDOM.push(<div key={ index }>{ file.name } ({ (file.size/1024.0).toFixed(2) } kB) | { rmButton }</div>);
    });
    updateFileToSendTable(openedFilesDOM);
  };


  const updateFiles = function(fileId){
    setSaveModal(<></>);

    if(fileId > 0)
      getFilesForPage(formId, arrayOfFilesToTable, arrayOfFilesToTable);
  };

  const openFile = function(e){
    e.preventDefault();
    if(typeof formFilesRef.current.files !== 'undefined' && formFilesRef.current.files.length > 0){
      let newFilesList = [...filesToSend, formFilesRef.current.files[0]];
      appendFileToSend(newFilesList);
      openedFilesToTable(newFilesList);
    }
  };

  const removeFromOpened = (e) => {
    e.preventDefault();
    let fileName = e.target.value;
    if(typeof fileName === 'undefined')// when <img /> is clicked, this happen;
      fileName = e.target.parentNode.value;

    if(typeof fileName !== 'undefined'){
      let newFilesList = filesToSend.filter((file) => file.name !== fileName);
      appendFileToSend(newFilesList);
      openedFilesToTable(newFilesList);
    }
  };


  const hideModal = () => {
    setSaveModal(<></>);
  };

  const popUpSaveFormDetails = (message) => {
    setSaveModal(
      <ModalWarning
        handleAccept={hideModal}
        title={"Zmiana danych rozdziału"}
        message={message}
        show={true}
        acceptText={"Ok"}
        id={0}
      />
    );
  };

  const popUpAskForDeleteFile = function(e){
    e.preventDefault();
    let fileId = e.target.value;
    if(typeof fileId === 'undefined')// when <img /> is clicked, this happen;
      fileId = e.target.parentNode.value;

    setSaveModal(
      <ModalWarning
        handleAccept={ handleRemoveFile }
        handleCancel={ hideModal }
        title={"Usunięcie pliku"}
        message={ "Czy na pewno chcesz by plik został usunięty?" }
        show={true}
        acceptText={"Ok"}
        id={ parseInt(fileId, 10) }
      />
    );
  };

  const popUpDeleteFileInformation = (message, fileId) => {
    setSaveModal(
      <ModalWarning
        handleAccept={ updateFiles }
        title={"Usunięcie pliku"}
        message={message}
        show={true}
        acceptText={"Ok"}
        id={ fileId }
      />
    );
  };

  const handleRemoveFile = (fileId) => {
    removePageFile(fileId, popUpDeleteFileInformation);
  };


  const handleSave = (e) => {
    e.preventDefault();
    const isValid = isValidUrl(link);
    if(isValid || !link) {
      const isSaved = savePageDetails(
        popUpSaveFormDetails,
        formId,
        formName,
        link,
        description
        ); // pack as one argument;
    } else {
      popUpSaveFormDetails("Błąd: Wprowadzono nieprawidłowy adres url");
    }

    if(filesToSend.length > 0){
      let filesToSendCopy = [];
      for(let i = 0; i < filesToSend.length; i++)
        filesToSendCopy.push(filesToSend[i]);

      showProgress();
      addNewFiles(formId, filesToSendCopy, messageWhenOneFileUploaded, function(){}, showProgress);
    }
  };

  const showProgress = function(fileName, loaded, totalBytes){
    let progressCopy = {};
    if(fileName === undefined || fileName === null){
      let fName;
      for(let i = 0; i < filesToSend.length; i++){
        fName = filesToSend[i].name;
        progressCopy[fName] = {loaded: 0, total: 0};// filesToSend[i].size;
      }

      updateUploadingProgress(progressCopy);
      return;
    }


    if(uploadingFilesProgress !== true)
      progressCopy = JSON.parse(JSON.stringify(uploadingFilesProgress) );

    progressCopy[fileName] = {loaded: loaded, total: totalBytes};
    updateUploadingProgress(progressCopy);
  };

  const messageWhenOneFileUploaded = function(fileName, response){
    let button = <button value={ response.id } className="btn" onClick={ popUpAskForDeleteFile }><img src={ trashIcon } alt="Remove file" /></button>
    let link = <a href={ response.data_file }>{ response.name } ({ (response.size/1024.0).toFixed(2) } kB)</a>
    let row = <div key={ response.id }>{ link } | { button }</div>

    formFiles.push(row);
    updateFormFiles(formFiles);

    let progressCopy = JSON.parse(JSON.stringify(uploadingFilesProgress) );

    if(progressCopy.hasOwnProperty(fileName) )
      delete progressCopy[fileName];

    if(Object.keys(progressCopy).length < 1)
      updateUploadingProgress(true);
    else
      updateUploadingProgress(progressCopy);
  };
  



  return (
    <form className="FormDescription" onSubmit={ handleSave }>
      <header className="FormDescription__header">
        <p className="FormDescription__text">
          <i>Tytuł rozdziału:</i>
        </p>
        <div className="FormDescription__title-wrapper">
          <img className="FormDescription__icon" src={ bookOpenedIcon } alt="#" />
          {/* TODO: stan normalny i stan edycji nazwy rozdziału */}
          <input
            id="title"
            type="text"
            className="FormDescription__input form-control m-0"
            placeholder="Tytuł"
            value={ formData ? formName : "Ładowanie..." }
            onChange={ (e) => setFormName(e.target.value) }
            maxLength="200"
            required
            />
            {/* TODO */}
            {/* <h1 className="FormDescription__title">{ formData ? formName : "Ładowanie..." }</h1> */}
            {/* <button className="FormDescription__button">Edytuj</button> */}
        </div>
      </header>

      <section className="FormDescription__content">
        <label className="FormDescription__label" htmlFor="link">Link do wideo / dokumentu</label>
        {/* (Limit na rozdział: 10MB - potrzebujesz więcej? < a >Dowiedz się jak...</ a >) */}
        <div className="FormDescription__content-box">
          <input
              id="link"
              type="url"
              className="FormDescription__input form-control"
              placeholder="https://example.com"
              value={ formData ? link : "Ładowanie..." }
              onChange={ (e) => setLink(e.target.value) }
              maxLength="200"
            />

            <label className="FormDescription__button btn" htmlFor="filesUpload">Dołącz plik</label>
            <input style={{ visibility: "hidden" }} id="filesUpload" type="file" ref={ formFilesRef } onChange={ openFile } />{/* Dołącz plik</button> */}
          </div>
              <div className="table table-striped">
              { filesToSendTable }
              { formFiles }
              </div>

        <label className="FormDescription__label" htmlFor="desc">Tekst (liczba znaków: 1500)</label>
        <textarea
          id="desc"
          className="FormDescription__input form-control"
          placeholder="Tekst"
          rows="4"
          value={ formData ? description : "Ładowanie..." }
          onChange={ (e) => setDescription(e.target.value) }
          maxLength="1500"
        ></textarea>
        <div className="FormDescription__button-wrapper">
          <button className="FormDescription__button FormDescription__button--right btn" type="submit">
            Zapisz opis
            {/* Po dodaniu funkcjonalności edycji samego tytułu zmienić treść przycisku na:  */}
            {/* Zapisz tekst */}
          </button>
        </div>
      </section>
      { saveModal }
    </form>
  );
};

export default FormDescription;
