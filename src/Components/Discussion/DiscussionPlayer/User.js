import React, {useState} from "react";

function User(props) {
  const {slideData, updateResponse} = props
  const [response, setResponse] = useState('')

  function submitResponse(e) {
    e.preventDefault()
    const responseData = {
      response: response
    }
    updateResponse(responseData)
    setResponse('')
    console.log("submit button clicked!")
  }

  return (
    <div className="card">
      <h3>{props.slideData.question}</h3>
      <textarea id="response" value={response} onChange={e => setResponse(e.currentTarget.value)}/>
      <button onClick={e => submitResponse(e)}>Submit</button>
      {response}
    </div>
  );
}

export default User;
