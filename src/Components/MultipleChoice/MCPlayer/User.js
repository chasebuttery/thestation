import React, { useState, useEffect } from 'react'
import {addToPlayerScore} from '../../../Backend/SessionsDB'
import './style.scss'


export default function MultipleChoiceUser (props) {
    const {sessionID, slideNum, slideData, State, updateResponse, user} = props;

    const [localState, setLocalState] = useState('question')


    let question = slideData.question;
    let a = slideData.A;
    let b = slideData.B;
    let c = slideData.C;
    let d = slideData.D;

    let aans = slideData.Aans;
    let bans = slideData.Bans;
    let cans = slideData.Cans;
    let dans = slideData.Dans;


    const [correct, setCorrect] = useState(false)


    


 useEffect(() => {
    if(State == 'reset')
    {
        setLocalState('question');
    }
  }, [State])
    
    const submit= (e, id) => {
        e.preventDefault();
        //props.submit(id);



        console.log("selectedddd!" + id)
        setLocalState('standby')
        updateResponse({answer: id})

        console.log("LOOK" + aans + id)
        if(aans && 'A' ==id){
            setCorrect(true);
        }
        else if(bans && 'B' ==id){
            setCorrect(true);
        }
        else if(cans && 'C' ==id){
            setCorrect(true);
        }
        else if(dans && 'D' ==id){
            setCorrect(true);
        }
        else{
            setCorrect(false)
        }
    }


    const Answer = (id, text, color) =>{
        return (
            <div className={"Option" + color} onClick={(e)=>submit(e, id)}>
                    <h3 className={"text"}> {text} </h3> 
            </div>
            //<div className={"btn btn-large col s6 " + color} onClick={(e)=>submit(e, id)} >{text}</div>
        )
    }



    const isAnswer = (id, text, correct) =>{
        console.log(correct)

        let color= "red";
        if(correct){
            color = "green";
            console.log("ans" + text)

        }


        return (
            <div className={"Option" + color}>
                    <h3 className={"text"}> {text} </h3> 
            </div>
        )
    }
// console.log(user)
// console.log(slideData)


    return(
        <div className = "User">
            {(localState == 'question')&& (State == 'question')&&

                <div className="Question" >
                    <h1>{question}</h1>
                    <div className="Options">
                        {Answer('A', a, 'red')}
                        {Answer('B', b, 'green')}
                        {Answer('C', c, 'blue')}
                        {Answer('D', d, 'yellow')}
                    </div>
                </div>
            }

            {(localState == 'standby')&&(State == 'question')&&
            
                <div className="Wait" >
                    <h3>Waiting for Host...</h3>
                </div>
            }

            {(State == 'answer')&&

                <div className="Answer" >
                    <h1>{question}</h1>
                    <div className="Options">
                        {isAnswer('A', a,  aans)}
                        {isAnswer('B', b,  bans)}
                        {isAnswer('C', c,  cans)}
                        {isAnswer('D', d,  dans)}
                    </div>

                    <div>
                    {correct && <h2>Correct</h2>}
                    {!correct && <h2>Incorrect</h2>}
                    </div>

                </div>
            }

        </div>

    )

}