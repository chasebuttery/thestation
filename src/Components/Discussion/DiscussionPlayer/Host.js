import React from "react";

function Host(props) {
  const { slideData, slideState, userData, slideNum, updateState } = props;
  console.log("fick this")
  function Question() {
    return (
      <div>
        <h3>{slideData.question}</h3>
      </div>
    );
  }
  
  if (slideState === "showQuestion") {
    return <Question />;
  }

  return <div>Not looking at if statement I guess...</div>;
}

export default Host;
