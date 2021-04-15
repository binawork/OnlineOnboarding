import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { fetchFormData } from "../../hooks/FormsEdit";
import { singleCombo } from "../../hooks/Packages";
import EmployeeSections from "./EmployeeSections";
import PageAddressBar from "../../PageAddressBar";

const EmployeeSingleFormPage = ({ page, userId }) => {
  const [form, setForm] = useState(page);
  const [isVideo, setIsVideo] = useState(false);
  const [pageLink, setPageLink] = useState(<></>);
  const { form_id:formId } = useParams();
  const { data:formData } = fetchFormData(formId);
  const packageTitle = singleCombo(formData?.package)?.title;

  useEffect(() => {
    if(!page) {
      setForm(formData);
    }
  }, [formData]);

  useEffect(() => {
    if(form?.link?.match(
        /^(?:(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu(?:be\.com|\.be))\/(?:watch\?v\=|v\/|embed\/)?([\w\-]+))/i
    )) {
      setPageLink(form.link 
        ? form.link.replace(/watch\?v=/g, "embed/").replace(/&ab_channel=\w*/g, "")
        : "");
        setIsVideo(true);
    } else if(form?.link?.match(
      /^(?:(?:https?:\/\/)?(?:www\.)?vimeo\.com.*\/([\w\-]+))/i
    )) {
      setPageLink(form.link
      ? form.link.replace(/vimeo\.com/g, "player.vimeo.com/video")
      : ""
      );
      setIsVideo(true);
    } else if(form?.link){
      setPageLink(<a href={ form.link } target="_blank" rel="noopener noreferrer">{ form.link }</a>);
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
            { isVideo ? (
                <div className="embed-responsive embed-responsive-21by9">
                  <iframe className="embed-responsive-item"
                          src={ pageLink }
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                          title="video"
                  />
                </div>
              ): (<>{ pageLink }</>)
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
