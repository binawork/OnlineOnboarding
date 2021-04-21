import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { fetchFormData } from "../../hooks/FormsEdit";
import { singleCombo } from "../../hooks/Packages";
import EmployeeSections from "./EmployeeSections";
import PageAddressBar from "../../PageAddressBar";
import { linkToVideo } from "../../utils.js";


const EmployeeSingleFormPage = ({ page, userId }) => {
  const [form, setForm] = useState(page);
  const [pageLinkVideo, setPageLink] = useState({link: "", isVideo: false});
  const { form_id:formId } = useParams();
  const { data:formData } = fetchFormData(formId);
  const packageTitle = singleCombo(formData?.package)?.title;

  useEffect(() => {
    if(!page) {
      setForm(formData);
    }
  }, [formData]);

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
        page={ `Formularz: ${formData?.title || ""}` } 
        previousPages={[ 
          {title: `Katalog: ${packageTitle || ""}`, 
            url: `/package/${formData?.package}`
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
        <EmployeeSections pageId={ parseInt(formId) } userId={ userId } />
      </div>
    </div>
  );
};

EmployeeSingleFormPage.propTypes = {
  page: PropTypes.object,
  userId: PropTypes.number,
};

export default EmployeeSingleFormPage;
