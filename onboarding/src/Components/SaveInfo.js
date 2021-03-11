import React from "react";

const SaveInfo = ({ message }) => {
  return (
    <div
      className="fixed-bottom d-flex justify-content-center show-and-hide"
      style={{ display: "fixed-bottom", left: "240px" }}
    >
      <div
        className="m-2 p-2"
        style={{
          width: "max-content",
          backgroundColor: "rgba(226, 232, 238, 0.57)",
          color: "black",
          textAlign: "center",
          borderRadius: "4px",
        }}
      >
        { message ? message : "Zapisano zmiany" }
      </div>
    </div>
  );
};

export default SaveInfo;
