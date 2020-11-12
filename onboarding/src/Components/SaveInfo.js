import React from "react";

const SaveInfo = () => {
  return (
    <div
      className="fixed-bottom d-flex justify-content-center show-and-hide"
      style={{ display: "fixed-bottom", left: "240px" }}
    >
      <div
        className="m-2 p-2"
        style={{
          width: "150px",
          backgroundColor: "rgba(226, 232, 238, 0.57)",
          color: "black",
          textAlign: "center",
          borderRadius: "4px",
        }}
      >
        Zapisano zmiany
      </div>
    </div>
  );
};

export default SaveInfo;
