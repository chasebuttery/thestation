import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import {getStationData} from '../Backend/StationsDB'
import UsersList from '../Components/Users/UsersList'
import {incrementSlide, getUsersList, getSessionData, setSlideState, setMetaData, setGameOverDB} from '../Backend/SessionsDB'
import ContentHost from '../Components/Content/ContentPlayer/Host'
import FakeoutHost from '../Components/Fakeout/FakeoutPlayer/Host'
import MultipleChoiceHost from '../Components/MultipleChoice/MCPlayer/Host'
import EndGameHost from '../Components/EndGame/Host'
import DiscussionHost from '../Components/Discussion/DiscussionPlayer/Host'
import './GameHostPage.scss'

export default function GameHostPage (props) {
    const {sessionID} = props.match.params;
 
 const [session, setSession] = useState({})
   const [station, setStation] =  useState({})
  const [users, setUsers] = useState([])


  useEffect(() => {
    getSessionData(handleSessionChange, sessionID)
  }, [sessionID])
  function handleSessionChange(sessionData){
    setSession(sessionData)
  }

  useEffect(() => {
    getUsersList(handleUsersRefresh, sessionID)
  }, [sessionID, session])
  function handleUsersRefresh(userData){
    setUsers(userData.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }


  useEffect(() => {
    async function getStation (stationID) {
        if(stationID != undefined){
            const stationData = await getStationData(stationID)
            setStation(stationData)
        }
    }
    getStation(session?.stationID)
  }, [sessionID, session])









  function setState(state)
  {
    setSlideState(sessionID, state)
  }

    function setData(data){
      setMetaData(sessionID, data);
    }


  function nextSlide(){
    //console.log(sessionID)
    if(station.slides.length -1 > session.slideNum){
        incrementSlide(sessionID);
        setState('reset')
    }
    else{
      setGameOverDB(sessionID);
    }

  }

  // console.log(station)
  // console.log(session)
  // console.log(session?.stationID)
   //console.log(users)





  return (
    <div className="GameHostPage">

      {/* lobby */}
      {session?.slideNum == -1 && users?.length >= 0 && (
        <div>
          <h1>Boarding..</h1>
          <h2>{sessionID}</h2>
          <h5>enter code on device and join</h5>
        </div>
      )}
      {/* users */}
      {session?.slideNum == -1 && users?.length >= 0 && (
        <UsersList sessionID={sessionID} users={users} />

      )}



      {/* slide types */}
      {station?.slides &&
        session?.slideNum >= 0 &&
        station?.slides[session.slideNum].type == "content" &&
        (session?.gameOver == false) && (
          <h1>{"on slide " + session.slideNum + " its a img or vid"} </h1>
        ) && (
          <ContentHost contentID={station.slides[session.slideNum].fileName} />
        )}


      {station?.slides &&
        session?.slideNum >= 0 &&
        station?.slides[session.slideNum].type == "fakeout" &&
        (session?.gameOver == false)&& (
          <h1>{"on slide " + session.slideNum + " its a fakeout"} </h1>
        ) && (
          <FakeoutHost
            slideData={station.slides[session.slideNum]} slideState ={session.state} userData = {users} metaData={session.MetaData} slideNumber={session.slideNum} setState={setState} setData={setData}/>
        )}

      {station?.slides && session?.slideNum >= 0 && (station?.slides[session.slideNum].type == 'multipleChoice') &&
        <h1>{'on slide ' + session.slideNum + ' its a MC'} </h1> &&
        <MultipleChoiceHost sessionID = {sessionID} slideData={station.slides[session.slideNum]} slideState={session.state} userData={users} slideNumber={session.slideNum} setState={setState} />
      }

      {station?.slides &&
        session?.slideNum >= 0 &&
        station?.slides[session.slideNum].type == "discussion" &&
        (session?.gameOver == false) && (
          <h1>{"on slide " + session.slideNum + " its a discussion"} </h1>
        ) && (
          <DiscussionHost
            slideData={station.slides[session.slideNum]}
            slideState="showQuestion"
            userData={users}
          />
        )}

        
      {(session?.gameOver == false) && <button onClick={nextSlide}> Next Slide </button>}




      {/* end game */}
      {(session?.gameOver == true) && <EndGameHost users={users} />}


    </div>
  );
}



