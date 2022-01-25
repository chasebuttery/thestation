import React, { useState,NavLink } from 'react'
import {useHistory } from 'react-router-dom'
import {createSession} from '../../Backend/SessionsDB'
import firebase from '../../firebase'


export default function StationCard (props) {
  const { station } = props
  const history = useHistory();

  const [showImg, setShowImg] = useState(false);
  const [img, setImg]  = useState()



  function downloadImg () {

    let contentID = station?.slides;

    // Create a reference to the file we want to download
    var storageRef = firebase.storage().ref()
    if(station?.slides[0]){
    var starsRef = storageRef.child('images/' + station?.slides[0].fileName + '.jpg')
    //console.log('getting img')
    }
    
    // Get the download URL
    const imgUrl = starsRef
      .getDownloadURL()
      .then(function (url) {
        // Insert url into an <img> tag to "download"
        setImg(url)
        setShowImg(true)
        //console.log("in")
      })
      .catch(function (error) {
        // A full list of error codes is available at
        //console.log("ig not downloaded")
      })

  }


  function startPlayingStation (event) {

    // let sessionString =
    //   'session' +
    //   Math.random()
    //     .toString(36)
    //     .substring(7)
    // let sessionNum = Math.floor(1000 + Math.random() * 9000)
    // const newID = sessionString + sessionNum

    var newID = (Math.floor(1000 + Math.random() * 9000)).toString();
    //console.log(newID);
    


    createSession(station.stationID, newID)


    
    history.push('/play/host/' + newID)
    event.preventDefault()
  }


  if(station?.slides){
  if(station?.slides[0] != undefined){
 downloadImg();
  }
}


  return (
    <div className='CreatePage card-panel'>
      <h3>{station?.title || 'N/A'}</h3>

      {showImg &&
      <img width='320' height='240' src={img} />
        }
    
      <p>{station?.description || 'N/A'} </p>

    <button onClick = {startPlayingStation}>Host Station</button>
    </div>
  )
}
