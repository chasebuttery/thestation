import React, { useState } from 'react'
import firebase from '../../../firebase'
//import getstation data from /Backend/StationDB

export default function User (props) {
  const { contentID } = props
  const [img, setImg]  = useState()
  
    function downloadImg () {
      // Create a reference to the file we want to download
      var storageRef = firebase.storage().ref()
    
      var starsRef = storageRef.child('images/' + contentID + '.jpg')
      //console.log('getting img')
  
      // Get the download URL
      const imgUrl = starsRef
        .getDownloadURL()
        .then(function (url) {
          // Insert url into an <img> tag to "download"
          setImg(url)
          //console.log("in")
        })
        .catch(function (error) {
          // A full list of error codes is available at
          //console.log("not in")
        })
  
    }

    downloadImg();


  return (
    <div className='ContentHost'>

      <img width='320' height='240' src={img} />
      
    </div>
  )
}