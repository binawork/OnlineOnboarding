import React from "react";
import $ from "jquery";

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

const MarkdownArea = ({ id, content, contentChange, simple, placeholder }) => {
  $(document).ready(function () {
    simple
      ? $(`#${"summernote" + id}`).summernote({
          minHeight: 100,
          lang: "pl-PL",
          placeholder: placeholder,
          toolbar: [
            ["font", ["bold", "italic", "underline", "strikethrough", "clear"]],
            ["fontsize", ["fontsize"]],
            ["insert", ["link"]],
          ],
          callbacks: {
            onChange: function (cont) {
              contentChange(cont, id);
            },
            onInit: function () {
              $(this).summernote("code", content);
            },
          },
        })
      : $(`#${"summernote" + id}`).summernote({
          minHeight: 100,
          lang: "pl-PL",
          placeholder: "Wpisz treść",
          toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "italic", "underline", "strikethrough", "clear"]],
            ["fontsize", ["fontsize"]],
            ["fontname", ["fontname"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["insert", ["link", "picture", "video", "hr"]],
          ],
          callbacks: {
            onChange: function (cont) {
              contentChange(cont, id);
            },
            onInit: function () {
              $(this).summernote("code", content);
            },
          },
        });
    $(".dropdown-toggle").dropdown();
  });

  return (
    <div draggable="false" style={{cursor: "auto"}}>
      <div id={"summernote" + id}></div>
    </div>
  );
};

export default MarkdownArea;
