import React, { useState } from 'react'
import firebase from '../../firebase'
import ColorSelect from './ColorSelect'
import './PlayerEditor.scss'
import Player from '../../Images/Icons/profile.png'




export default function PlayerEditor (props) {
const {user} = props
  //CONTENT

  function changeColor (event) {
    console.log("chanigng color")
  }


function saveUserColor(event){
    console.log("saving color")
    return null
}

//console.log(user?.name)
  


  return (
    <div className='PlayerEditor'>
        <h1> {user?.name || "none"}
        </h1>
        <img className='Player' src={Player} />
        <h2> {user?.score  || "0"}   </h2>


    </div>
  )
}
