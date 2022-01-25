import React, { useState, useEffect} from 'react'
import firebase from '../../../firebase'
import { addImgToStation, addVidToStation } from '../../../Backend/StationsDB'
import { Link } from 'react-router-dom'
import { Form } from 'react-advanced-form'

export default function User (props) {
  const {slideData, slideState, updateResponse, metaData} = props

  const [localState, setLocalState] = useState('question')
  const [response, setResponse] = useState('');

  function saveResponse(e){
        updateResponse({answer: response});
        setLocalState('standby')
        console.log("save it")
  }

  function vote(id)
  {
        updateResponse({answer: response,
                        vote: id});

  }

  useEffect(() => {
        setLocalState('question');
  }, [slideState])

  return (
    <div className='Fakeout'>

        {(slideState == 'question') && localState =='question' &&
        <div>
            <h1>{slideData.question}</h1>
            
            <div class="input-field">
              <label> Enter a lie: </label>
              <input type="text" value={response} onChange={e => {setResponse( e.currentTarget.value )}} />
            </div>

              {/* input */}
            <button onClick = {saveResponse}>saveResponse</button>
          </div>
        
        }
        {(slideState == 'question') && localState !='question' &&
            <div className="card-panel" >
                    <h3>Waiting for Host...</h3>
            </div>
        }


        
         {(slideState == 'responses') && localState =='question' &&
          <div>
            responces
            <div>
            {metaData.map((element, num) => 
              <div className='btn' onClick={e=>vote(num)} key={num}> 
                {element}
              </div>
            )}

            </div>
          </div>
         }

        {(slideState == 'responses') && localState !='question' &&
            <div className="card-panel" >
                    <h3>Vote Submitted...</h3>
            </div>
        }
         {/* //show the responses in buttons
         onclick(saveAnswer)
         */}

        {(slideState == 'showVotes') && 
        <div>
            <div className="card-panel" >
                    <h3>Waiting on Host...</h3>
            </div>
          
        </div>
        }



    </div>
  )
}
