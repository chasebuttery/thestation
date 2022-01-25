import React, { useState } from 'react'

export default function User (props) {
  const {user} = props

  //console.log(user)

  return (
    <div className='EndGame'>
      
      <h1> End of game </h1>
      <h3> Congrats you had {user.score} point(s)! </h3>


    </div>
  )
}
