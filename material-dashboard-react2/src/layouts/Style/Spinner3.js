/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React from "react";
import PuffLoader from "react-spinners/PuffLoader";

function Spinner3() {
  return (
    // eslint-disable-next-line react/style-prop-object
    <div className="contentWrap">
      <div
        style={{
          position: "fixed",
          top: "45%",
          left: "55%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h3>2022년 전월세 통계 정보를 갱신중입니다.</h3>
      </div>
      <div
        style={{
          position: "fixed",
          top: "55%",
          left: "55%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <PuffLoader color="#0e214b" cssOverride={{}} loading size={60} speedMultiplier={2.5} />
      </div>
    </div>
  );
}

export default Spinner3;
