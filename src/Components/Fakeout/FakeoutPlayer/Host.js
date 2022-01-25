import React, { useState } from 'react'
import firebase from '../../../firebase'
import { addImgToStation, addVidToStation } from '../../../Backend/StationsDB'
import { Link } from 'react-router-dom'
import { Form } from 'react-advanced-form'

export default function Host (props) {
  const {slideData, slideState, userData, slideNumber, setState,metaData, setData} = props

  //console.log(slideData, slideState, users)

    let responseCount = 0; 
    let voteCount = 0;
    let votes = [];

    for (let i = 0; i < metaData?.length; i++) {
      votes[i] = 0;
    }

    for (let i = 0; i < userData.length; i++) {
        const element = userData[i];
        console.log(element)
        if(element?.responses){
            if(element?.responses[slideNumber]?.answer){
                responseCount++;
            }
            if(typeof element?.responses[slideNumber]?.vote !== 'indefined'){
                voteCount++;
                votes[element?.responses[slideNumber]?.vote]++;
            }
        }
    }

    if(slideState == 'reset'){
        setState('question')
    }


  //function
  //if(userData.responses = userData.length){
    //change slideState to 'showResponses'
    //updateState(slideState)
  

    function DisplayResponse(user){
      return (


        <div className ='row'>
          <div className="col s6 ">
            <div className="card-panel">
              {user.responses[slideNumber].answer}
            </div>
          </div>
        </div>
      )

    }


  //updateResponse(responseData);

  function ReadyButton(e){

    let data = [];
    for (let i = 0; i < userData.length; i++) {
        const element = userData[i];
        if(element?.responses){
            if(element?.responses[slideNumber]?.answer){
              data[i] = element.responses[slideNumber].answer;
            }else{
              data[i] = ''
            }
        }
    }
    data[userData.length] = slideData.answer
    setData(data)
    setState('responses')
  }

  function showVotes(){
    setState('showVotes')


  }
  

  return (
    <div className='Fakeout container'>


        {(slideState == 'question') && 
        <div>
          <h1>{slideData.question}</h1>
          <div>Responses: {responseCount}</div>
          <button className='btn' onClick={ReadyButton}>Ready</button>
        </div>
       }


        {(slideState == 'responses') && 
          <div>
            <div>Votes: {voteCount}</div>
          <button className='btn' onClick={showVotes}>Ready</button>

                <div className ='row'>
            {userData.map((element, num) => 
              <div> 
                  <div className="col s6 ">
                    <div className="card-panel">
                      {element.responses[slideNumber].answer}
                    </div>
                  </div>
                </div>
            )}

                  <div className="col s6 ">
                    <div className="card-panel">
                      {slideData.answer}
                    </div>
                  </div>
                </div>
          </div>
        }

        {(slideState == 'showVotes') && 
          <div>
            <div>Votes: {voteCount}</div>
                <div className ='row'>
            {metaData.map((element, num) => 
                  <div className="col s6 ">
                    <div className="card-panel">
                      {element + '  (' + votes[num] + ')'} 
                    </div>
                  </div>
            )}
              </div>

          </div>
        }
        
        {/* {(slideState == 'showResponses') && slideData.responses}


        {(slideState == 'showAnswer') && slideData.responses} */}



    </div>
  )
}
