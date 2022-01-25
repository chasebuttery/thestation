import React, { useState } from 'react'
import firebase from '../../../firebase'
//import getstation data from /Backend/StationDB

export default function Host (props) {
  const { contentID } = props
  const [img, setImg]  = useState()
  const [vid, setVid] = useState()
  const  [showVid, setShowVid] = useState(false)
  const [showImg, setShowImg] = useState(false);
  
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
          setShowImg(true)
          console.log("in")
        })
        .catch(function (error) {
          // A full list of error codes is available at
          //console.log("ig not downloaded")
        })
  
    }

    function downloadVid (event) {
      // Create a reference to the file we want to download
      var storageRef = firebase.storage().ref()
      var starsRef = storageRef.child('videos/' + contentID + '.mp4')
      //console.log('getting vidd from ' + starsRef)
      // Get the download URL
      const vidUrl = starsRef
        .getDownloadURL()
        .then(function (url) {
          // Insert url into an <img> tag to "download"
          setVid(url)
          setShowVid(true)
        })
        .catch(function (error) {
          // A full list of error codes is available at
          //console.log("vid not downloaded")
        })

    }
  
    //console.log(contentID)
if(contentID?.substr(0,3) == 'img' ){
    downloadImg();
}else if(contentID?.substr(0,3) == 'vid'){
  //console.log("down")
    downloadVid();
}


  return (
    <div className='ContentHost'>

       <h1>Welcome</h1>

        {showImg &&
      <img width='320' height='240' src={img} />
        }
        {showVid && 
        <video width='320' height='240' controls>
            <source src={vid} type='video/mp4' />
          </video>
        }
      
    </div>
  )
}
