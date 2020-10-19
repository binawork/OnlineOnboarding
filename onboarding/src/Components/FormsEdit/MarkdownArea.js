import React, { useEffect } from "react";
import $ from "jquery";
import "popper.js/dist/popper";

import ReactSummernote from "react-summernote";
import "react-summernote/lang/summernote-pl-PL";
import "react-summernote/dist/react-summernote.css";
import "summernote/dist/summernote-bs4.min.css";
import "summernote/dist/summernote-bs4.js";

try {
  window.$ = window.jQuery = require("jquery");
  window.Popper = require("popper.js").default;
  require("bootstrap");
} catch (e) {
  console.log(e);
}

const MarkdownArea = ({ id, descriptionChange }) => {
  useEffect(() => {

    $(`#${"summernote" + id}`)
    .summernote({
      id: `${"descr" + id}`,
      lang: "pl-PL",
      height: 200,
      dialogsInBody: true,
      placeholder: "Opis",
      toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "italic", "underline", "strikethrough", "clear"]],
        ["fontname", ["fontname"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["insert", ["link", "picture", "video"]],
      ],
      callbacks: {
        onChange: function(content) { descriptionChange(content, id)}
      },
    });
    $(".dropdown-toggle").dropdown();
  });

  return (
    <div className="form-group">
      <div id={"summernote" + id}></div>
    </div>
  );
};

export default MarkdownArea;
