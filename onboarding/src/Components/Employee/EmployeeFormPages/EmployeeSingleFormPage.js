import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import EmployeeSections from "./EmployeeSections";
import PageAddressBar from "../../PageAddressBar";
import { useFetchGetSync } from "../../hooks/useFetch";
import { getProgressForPage } from "../../hooks/ProgressStats";
import { linkToVideo } from "../../utils.js";


const EmployeeSingleFormPage = ({ page, userId }) => {
  const [form, setForm] = useState(page);
  const [pageLinkVideo, setPageLink] = useState({link: "", isVideo: false});
  const [packageTitle, setPackageTitle] = useState("");
  const [status, setStatus] = useState({saved: false, isFinished: false, isChecked: false, readOnly: true});
  const { form_id:formId } = useParams();


  const pageCallback = function(response, abortCont){
    let packageId = 0, getPageTitle = true;//, pageId = 0;
    if(response){
      setForm({...response, saved: false, isFinished: false, isChecked: false, readOnly: true});
      if(!response.hasOwnProperty("package") )
        getPageTitle = false;
      else
        packageId = response.package;
      //pageId = parseInt(response.id, 10);
    } else {
      packageId = form.package;
      //pageId = parseInt(form.id, 10);
      let status_cp = {...status};
      if(form.hasOwnProperty('saved') ) // if(form.saved)  won't work because form.saved can = true or false;
        status_cp.saved = form.saved;
      if(form.hasOwnProperty('isFinished') )
        status_cp.isFinished = form.isFinished;
      if(form.hasOwnProperty('isChecked') )
        status_cp.isChecked = form.isChecked;
      if(form.hasOwnProperty('readOnly') )
        status_cp.readOnly = form.readOnly;

      setStatus(status_cp);
    }

    if(!getPageTitle)
      return;

    useFetchGetSync("api/package/", packageId, "Wystąpił błąd podczas pobierania katalogu!", abortCont)
      .then( (res) => {
          if(res.error)
            throw Error(res.error);
          return res;
      })
      .then( (response) => {
          if(response.title)
            setPackageTitle(response.title);
      });
  };

  const pageProgressCallback = (result, isNotError) => {
    if(isNotError){
      setStatus({...status, readOnly: result.readOnly, isFinished: result.isFinished});
    }
  };

  useEffect(() => {
    let abortCont = new AbortController();
    if(!page) {
      useFetchGetSync("api/page/", formId, "Wystąpił błąd podczas pobierania formularza!", abortCont)
        .then( (res) => {
          if(res.error)
            throw Error(res.error);
          return res;
        })
        .then(function(response){
          pageCallback(response, abortCont);
        })
        .catch((err) => {
          console.log(err.message);
        });
      //setForm(formData);
    } else {
      pageCallback(false, abortCont);
    }

    return () => abortCont.abort();
  }, []);

  useEffect(() => {
    if(form && userId > 0 && form.hasOwnProperty('id') )
      getProgressForPage(userId, form.id, pageProgressCallback);
  }, [userId, form]);

  useEffect(() => {
    let videoLink
    if(form?.link){
      videoLink = linkToVideo(form.link);
      if(videoLink.isVideo){
        setPageLink(videoLink);
      } else {
        videoLink.link = <a href={ form.link } target="_blank" rel="noopener noreferrer">{ form.link }</a>
        setPageLink(videoLink);
      }
    }
  }, [form]);


  return (
    <div className="page-inner">
      <PageAddressBar 
        page={ `Formularz: ${form?.title || ""}` } 
        previousPages={[ 
          {title: `Katalog: ${packageTitle || ""}`, 
            url: `/package/${form?.package}`
          } 
        ]} 
      />
      <div className="page-section">
        <div className="card card-fluid">
          <div className="card-header">{form?.title}</div>
          <div className="card-body">{form?.description}</div>

          <div className="card-body">
            { pageLinkVideo.isVideo ? (
                <div className="embed-responsive embed-responsive-21by9">
                  <iframe className="embed-responsive-item"
                          src={ pageLinkVideo.link }
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title="video"
                  />
                </div>
              ): (<>{ pageLinkVideo.link }</>)
            }
          </div>
        </div>
        <EmployeeSections pageId={ parseInt(formId) } userId={ userId } status={ status } />
      </div>
    </div>
  );
};

EmployeeSingleFormPage.propTypes = {
  page: PropTypes.object,
  userId: PropTypes.number,
};

export default EmployeeSingleFormPage;
