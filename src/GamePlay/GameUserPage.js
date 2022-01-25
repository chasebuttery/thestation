import React, { useState, useEffect } from 'react'
import {getSessionData, addUserResponse, addUserToSession, getUserData, listenUserData} from '../Backend/SessionsDB'
import {getStationData} from '../Backend/StationsDB';
import ContentUser from '../Components/Content/ContentPlayer/User'
import FakeoutUser from '../Components/Fakeout/FakeoutPlayer/User'
import MultipleChoiceUser from '../Components/MultipleChoice/MCPlayer/User';
import EndGameUser from '../Components/EndGame/User'
import DiscussionUser from '../Components/Discussion/DiscussionPlayer/User'
import PlayerEditor from '../Components/Player/PlayerEditor'

export default function GameUserPage (props) {
    const {sessionID, userID} =
 props.match.params;
 const [session, setSession] = useState({})
 const [station, setStation] = useState({})
 const [user, setUser] = useState({})

  function handleSessionChange(sessionData){
    setSession(sessionData)
  }
  
  useEffect(() => {
    getSessionData(handleSessionChange, sessionID)
  }, [sessionID])

  function onUserUpdate(userData){
      //console.log('user Data update: ');
      //console.log(userData);
      setUser(userData);
  }
  useEffect(() => {
    listenUserData(sessionID, userID, onUserUpdate)
  }, [userID])


  useEffect(() => {
    async function getStation (stationID) {
        if(stationID != undefined){
            const stationData = await getStationData(stationID)
            setStation(stationData)
        }
    }
    getStation(session?.stationID)
  }, [session])

    //  console.log(session)
    
    // console.log(user)


    function updateResponse(responseData){
     // console.log(user)
      let newResponses = user.responses;

      if(!newResponses){
        //console.log('epmty');
        newResponses = []
      }

      for (let i= 0; i < session.slideNum; i++) {
        const element = newResponses[i];
        if(!element){
          newResponses[i] = {};
        }
      }

      //console.log("RESPNESE", responseData)
      

      newResponses[session.slideNum] = responseData;
        //console.log(newResponses);
      addUserResponse(sessionID, userID, newResponses);
      
    }


  return (
    <div className="GameUserPage">
      {session?.slideNum == -1 && (
        <div>
          <h1>{"Welcome " + user?.name}</h1>
          <h2>Waiting for launch..</h2>
          <h4>This is the {station?.title} station</h4>
        </div>
      )}


      {session?.slideNum >= -1 && (
        <div>
          <PlayerEditor  user = {user} />
        </div>
      )}

      {(station?.slides &&
        session?.slideNum >= 0 &&
        station?.slides[session.slideNum].type == "content" && session?.gameOver == false) && (
          <div>
            <ContentUser contentID={station.slides[session.slideNum].fileName} />
          </div>
        )}

      {station?.slides &&
        session?.slideNum >= 0 &&
        station?.slides[session.slideNum].type == "fakeout" && (
          <div className="Fakeout">
            <FakeoutUser slideData={station.slides[session.slideNum]} slideState={session.state} updateResponse={updateResponse} metaData={session.MetaData}/>
          </div>
        )}

          {(station?.slides &&  session?.slideNum >= 0 && (station?.slides[session.slideNum].type == 'multipleChoice')) &&
          <div>
            <MultipleChoiceUser sessionID = {sessionID} slideNum = {session.slideNum} slideData={station.slides[session.slideNum]} State={session.state} updateResponse={updateResponse} user = {user}/>
          </div>
          }

      {station?.slides &&
        session?.slideNum >= 0 &&
        station?.slides[session.slideNum].type == "discussion" && (
          <div className="Discussion">
            <DiscussionUser slideData={station.slides[session.slideNum]} updateResponse={updateResponse}/>
          </div>
        )}

          {/* end game add check to see if Game is over or session session.gameOver == true && */}
          {(session?.gameOver && session.gameOver == true)  &&
            <EndGameUser user = {user} />
            }


    </div>
  );
}
