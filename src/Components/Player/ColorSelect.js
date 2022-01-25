import React, { useState } from 'react'
import firebase from '../../firebase'

import './ColorSelect.scss'

export default function ColorSelector (props) {
  const {color, setColor} = useState("red")

  //CONTENT

  function changeColor (event) {
    console.log("chanigng color")
    event.preventDefault()
  }


function saveUserColor(event){
    console.log("saving color")
    event.preventDefault()
    return null
}
  


  return (
    <div className='Color'>
      <form className='ColorInput' onSubmit = {saveUserColor}>
            <button onChange= {changeColor}>
            <div className = "red" > RED </div>
            </button>
            <div className = "blue" > BLUE </div>

      </form>


    </div>
  )
}
