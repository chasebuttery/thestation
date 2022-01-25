import React, { useState } from "react";
import firebase from "../../../firebase";
import './DiscussionInputCard.scss'

function DiscussionInputCard(props) {
  const { data, updateData } = props;

  return (
    <div className="DiscussionInputCard">
        <div className="Field">
          <label className = 'Label' htmlFor="question">Discussion Question:</label>
          <input
            type="text"
            id="question"
            value={data["question"]}
            onChange={(e) => {
              updateData("question", e.currentTarget.value);
            }}
          />
        </div>
    </div>
  );
}

export default DiscussionInputCard;
