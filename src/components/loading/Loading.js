import React from "react";
import "./loading.scss";

function Loading() {
  return (
    // <div id="loading">
    //   {/* <div className="loadingio-spinner-spinner-9qtw80gtmdb">
    //         <div className="ldio-zxbwzzspus">
    //             <div></div>
    //             <div></div>
    //             <div></div>
    //             <div></div>
    //             <div></div>
    //             <div></div>
    //             <div></div>
    //             <div></div>
    //             <div></div>
    //             <div></div>
    //             <div></div>
    //             <div></div>
    //         </div>
    //     </div> */}
    //   <div className="loading__spinner"></div>
    // </div>
    <div className="loading-overlay">
      <div className="spinner" />
    </div>
  );
}

export default Loading;
