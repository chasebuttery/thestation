import React, { useState, useEffect } from 'react'
import './style.scss'
import { addToPlayerScore } from '../../../Backend/SessionsDB';

export default function multipleChoiceHost (props) {
    const {sessionID, slideData, slideState, userData,  slideNumber, setState} = props;

    let question = slideData.question;
    let a = slideData.A;
    let b = slideData.B;
    let c = slideData.C;
    let d = slideData.D;


    let aans = slideData.Aans;
    let bans = slideData.Bans;
    let cans = slideData.Cans;
    let dans = slideData.Dans;



    let responseCount = 0; 


    console.log("this is user data", userData);
    console.log("this is slide data", slideData)

    
function scoreChange(){

    for (let i = 0; i < userData.length; i++) {
        const user = userData[i]

        if(user?.responses){

            if(user?.responses[slideNumber]?.answer == "A" && (aans == true)){
                console.log("add score to " + user.name  + " they have " + user.score)
                addToPlayerScore(sessionID, user.id, Number(slideData.points));

                //addToResponseCounts
                
            }
        }
    }
}



    for (let i = 0; i < userData.length; i++) {
        const element = userData[i];
        //console.log(element);
        if(element?.responses){
            if(element?.responses[slideNumber]?.answer){
                responseCount++;
            }
        }
    }


    if(slideState == 'reset'){
        setState('question')
    }

    const Submit= (e) => {
        e.preventDefault();
        setState('answer')
        scoreChange();

    }


    const Answer = (text, color) =>{
        return (
            <div className={"Option" + color}>
                    <h3 className = "text"> {text} </h3> 
            </div>
        )
    }

    const isAnswer = (text, correct) =>{

        let color= "red";
        if(correct){
            color = "green";
            //add score
            //addToPlayerScore()
        }

        return (
            <div className={"Option" + color}>
                    <h3 className = "text"> {text} </h3> 
        <p>{ responseCount || "(0)"}</p>
            </div>
        )
    }


    return(
<div className = "MultipleChoiceHost">

    {slideState != 'answer' &&
        <div className='MC'>
                <h1 className = "Question">{question}</h1>
                    <div className="Options">
                        {Answer(a, 'red')}
                        {Answer(b, 'green')}
                        {Answer(c, 'blue')}
                        {Answer(d, 'yellow')}
                    </div>
                <button className="btn" onClick={(e)=>Submit(e)}>Ready</button>
                <div className ="responses">Responses: {responseCount}</div>
        </div>
    }

    {(slideState == 'answer')&&
        <div className="AnswerDisplay" >
            <h1 className = "Question">{question}</h1>
            <div className="Options">
                {isAnswer(a,  aans)}
                {isAnswer(b,  bans)}
                {isAnswer(c,  cans)}
                {isAnswer(d,  dans)}
            </div>

        </div>
    }
    
</div>
    )
}