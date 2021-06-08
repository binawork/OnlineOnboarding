import React from "react";
import $ from "jquery";

import "summernote/dist/summernote-bs4.min.css";
import "summernote/dist/summernote-bs4.min.js";
import "summernote/lang/summernote-pl-PL";
import "../static/css/Markdown.scss";

try {
  window.$ = window.jQuery = require("jquery");
  window.Popper = require("popper.js").default;
  require("bootstrap");
} catch (e) {
  console.log(e);
}

const MarkdownArea = ({ id, content, contentChange, simple=false, placeholder, height=100 }) => {
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
          minHeight: height,
          lang: "pl-PL",
          placeholder: placeholder,
          toolbar: [
            ["style", ["style"]],
            ["font", ["bold", "italic", "underline", "strikethrough", "clear"]],
            ["fontsize", ["fontsize"]],
            ["fontname", ["fontname"]],
            ["color", ["color"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["insert", ["link", "hr"]],
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
    <div className="Markdown" draggable="false" style={{cursor: "auto"}}>
      <div id={"summernote" + id}></div>
    </div>
  );
};

export default MarkdownArea;
