import React from "react";
// import photo from "../../assets/images/1f937-2642.png"
import "./empty.scss";

function Empty() {
  return (
    <>
      <div style={{ textAlign: "center" }} className="empty">
        {/* <img src={photo} width={300} alt="" /> */}
        <h2 style={{ textAlign: "center" }}>Empty</h2>
      </div>
    </>
  );
}

export default Empty;
