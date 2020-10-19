import React, { useEffect } from "react";

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-pl-PL";
// import 'summernote/dist/summernote-lite.min.css';
// import 'summernote/dist/summernote-lite.js';
import "summernote/dist/summernote-bs4.min.css";
import "summernote/dist/summernote-bs4.js";
import "popper.js/dist/popper";
import $ from "jquery";

try {
  window.Popper = require("popper.js").default;
  window.$ = window.jQuery = require("jquery");
  require("bootstrap");
} catch (e) {
  console.log(e);
}

const MarkdownArea = ({ id, description, descriptionChange }) => {
  useEffect(() => {
    $(`#${"summernote" + id}`)
    // .on('summernote.change', (we, contents) =>
    //   // console.log(e.target.nextSibling.children[2].children[3].innerHTML)
    //    descriptionChange(contents, we)
    // )
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
    // $(`#${"summernote" + id}`).on('summernote.change', function(we, contents, $editable) {
    //   console.log(we);
    //   console.log(contents);
    //   console.log($editable);
    // });
    // $(".dropdown-toggle").dropdown();
  });

  return (
    <div className="form-group">
      <div id={"summernote" + id}></div>
      {/* <ReactSummernote
        id={"descr" + id}
        // value={description}
        options={{
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
        }}
        onChange={function(contents, $editable) {
          console.log(contents)
          console.log($editable)
        }}
      /> */}
    </div>
  );
};

export default MarkdownArea;
