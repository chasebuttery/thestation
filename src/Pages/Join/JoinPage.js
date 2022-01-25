import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './JoinPage.scss'
import { addUserToSession} from '../../Backend/SessionsDB'
import InputColor from '../../Components/Player/ColorSelect'

export default function JoinPage () {
  const [sessionID, setSessionID] = useState('')
  const [user, setUser] = useState({})


  const history = useHistory()

  function saveSessionID(e){
    setSessionID(e.target.value)
  }



  function saveName (e){
    let nameValue = e.target.value
    setUser(curUser => {
      return {
        ...curUser,
        name: nameValue

      }
    })
  }




  function joinGame(event){

    //Generate new UserID
    let userString =
      'user' +
      Math.random()
        .toString(36)
        .substring(7)
      let userNum = Math.floor(1000 + Math.random() * 9000)
      const newUserID = userString +userNum


      addUserToSession(sessionID, newUserID, user);

      history.push('/play/user/' + sessionID + '/' + newUserID)

      setUser(curUser => {
        return {
        ...curUser,
        id: newUserID
       }
      })
      event.preventDefault()
  }


  return (
    <div className='JoinPage'> 
      <h1> Join</h1>
      <p>join a station being hosted</p>
      <form className = "JoinGameForm" onSubmit = {joinGame}>
      <label >
          Enter Code:
          <input
            type='text'
            name='id'
            onChange={saveSessionID}
          />
        </label>
        <label>
          Enter Nickname:
          <input
            type='text'
            name='nickname'
            onChange={saveName}
          />
        </label>
        <button className = "JoinButton" >JOIN</button>
        </form>
    </div>
  )
}
