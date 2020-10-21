import React from "react";
import $ from "jquery";
import "popper.js/dist/popper";

import "summernote/dist/summernote-bs4.min.css";
import "summernote/dist/summernote-bs4.min.js";
import "summernote/lang/summernote-pl-PL";

try {
  window.$ = window.jQuery = require("jquery");
  window.Popper = require("popper.js").default;
  require("bootstrap");
} catch (e) {
  console.log(e);
}

const MarkdownArea = ({ id, description, descriptionChange }) => {
  $(document).ready(function() {
    $(`#${"summernote" + id}`).summernote({
      dialogsInBody: true,
      minHeight: 200,
      lang: "pl-PL",
      placeholder: "Opis",
      toolbar: [
        ["style", ["style"]],
        ["font", ["bold", "italic", "underline", "strikethrough", "clear"]],
        ['fontsize', ['fontsize']],
        ["fontname", ["fontname"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph"]],
        ["insert", ["link", "picture", "video"]],
      ],
      callbacks: {
        onChange: function(content) {
          descriptionChange(content, id);
        },
        onInit: function() {
            $(this).summernote('code', description);
        },
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
