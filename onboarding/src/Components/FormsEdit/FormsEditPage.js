import React, { useState } from "react";

//import "../../static/looper/stylesheets/theme.min.css";
//import "../static/looper/stylesheets/theme-dark.min.css";
// import "../static/looper/vendor/fontawesome/all.min.css";

import Navbar from "../Navbar";
import LeftMenu from "../LeftMenu";
import PageAddressBar from "../PageAddressBar";
import FormSections from "./FormSections";

function FormsEditPage() {
  const [pageName, setPageName] = useState("");
  const [link, setLink] = useState("");
	const [description, setDescription] = useState("");
	const [sections, setSections] = useState([])
	
  const handleSubmit = (e) => {
		e.preventDefault();
		console.log("wysyłanie")
  }

  return (
    <div className="app">
      <header className="app-header app-header-dark">
        <Navbar /> {/* placeholder */}
      </header>
      <LeftMenu /> {/* placeholder */}
      <main className="app-main">
        <div className="wrapper">
          <div className="page has-sidebar-expand-xl">
            <div className="page-inner">
              <PageAddressBar page={'Formularz / "#pageName"'} />{" "}
              {/* placeholder */}
              <form onSubmit={handleSubmit}>
                {" "}
                {/* form placeholder */}
                <div className="page-section">
                  <div className="card card-fluid">
                    <div className="card-header">Strona</div>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nazwa strony"
                            value={pageName}
                            onChange={(e) => setPageName(e.target.value)}
														required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="input-group">
                          <input
                            type="url"
                            className="form-control"
                            placeholder="Podłącz link do video / link do dokumentu"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          placeholder="Opis"
                          rows="4"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <div className="input-group-append">
                          <button className="btn btn-success">Zapisz stronę</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page-section">
                  <div className="card card-fluid">
                    <div className="card-header">Sekcje strony</div>
                    <FormSections sections={sections} setSections={setSections}/>
                    {/* placeholder */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default FormsEditPage;
