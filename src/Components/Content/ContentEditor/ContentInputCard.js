import React, { useState } from 'react'
import firebase from '../../../firebase'
import { addImgToStation, addVidToStation } from '../../../Backend/StationsDB'
import { Link } from 'react-router-dom'
import { Form } from 'react-advanced-form'
import './ContentInputCard.scss'

export default function ContentInputCard (props) {
  const {data, updateData} = props

  //CONTENT

  function saveImg (event) {
    let file = event.target.files[0]

    // Create a root reference
    var storageRef = firebase.storage().ref()

    //Get randomimgID
    let imgString =
      'img' +
      Math.random()
        .toString(36)
        .substring(7)
    //console.log('random', imgString)
    let imgNum = Math.floor(1000 + Math.random() * 9000)
    //console.log(imgNum)
    let imgName = imgString + imgNum

    updateData('fileName', imgName)

    // // Create a reference to 'mountains.jpg'
    var activityImgRef = storageRef.child('images/' + imgName + '.jpg')

    activityImgRef.put(file).then(function (snapshot) {
     // console.log('Uploaded a blob or file!')
    })
  }

  function saveVid (event) {
    let file = event.target.files[0]

    // Create a root reference
    var storageRef = firebase.storage().ref()

    //Get random vid ID
    let vidString =
      'vid' +
      Math.random()
        .toString(36)
        .substring(7)
    //console.log('random', vidString)
    let vidNum = Math.floor(1000 + Math.random() * 9000)
    //console.log(vidNum)
    let vidName = vidString + vidNum;

    updateData('fileName', vidName)

    // // Create a reference to 'mountains.jpg'
    var activityVidRef = storageRef.child('videos/' + vidName + '.mp4')

    activityVidRef.put(file).then(function (snapshot) {
      //console.log('Uploaded a blob or file!')
    })
  }


  return (
    <div className='ContentInputCard'>
      <form className='ContentInput'>

        <label>Label</label>
        <input id = 'title' type='text' value={data['title']}  onChange={e => {updateData('title', e.currentTarget.value )}} />

        <div className="Select"> 
              <div className="Image">
                <h2>Upload Image:</h2>
                  <input id='img' type='file' name='imgFile' onChange={saveImg} />
              </div>
            <div className="Video">
                <h2>Upload Video:</h2>
                <input id = 'vid' type='file' name='vidFile' onChange={saveVid} />
            </div>
        </div>
        
      </form>

      {data.fileName !== '' && data.fileName}


    </div>
  )
}
