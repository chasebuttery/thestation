import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import RocketIcon from '../../../Images/Rocket/r.png'
import Rocket4 from '../../../Images/Rocket/r1.png'
import Rocket32 from '../../../Images/Rocket/r2.png'
import './JoinInfoCard.scss'

export default function CreateInfoCard () {
  const history = useHistory()

  return (
    <div className='JoinInfoCard' onClick = {e => {history.push('/join')}}>
      
      <h1> Join</h1>
      <p> stations being hosted by entering a rocket code</p>
      <div className="Icons" >
      <img className='Icon' src={Rocket4} />
      <img className='Icon' src={RocketIcon} />
      <img className='Icon' src={Rocket32} />
      </div>
    </div>
  )
}
