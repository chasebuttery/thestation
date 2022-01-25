import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import '../HomePage.scss'
import ContentIcon from '../../../Images/Icons/Content.png'
import GamesIcon from '../../../Images/Icons/game.png'
import ActivityIcon from '../../../Images//Icons/teamup.png'
import './CreateInfoCard.scss'

export default function CreateInfoCard () {
  const history = useHistory()

  return (
    <div className='CreateInfoCard' onClick = {e => {history.push('/create')}}>
      
      <h1> Create</h1>
      <p> stations to play with your team by adding content, games, and activities</p>
        <div className="Icons">
          <div className ="Content">
          <img className='Icon' src={ContentIcon} />
          Content
        </div>
        <div className ="Game">
      <img className='Icon' src={GamesIcon} />
        Games
      </div>
      <div className ="Activity">
      <img className='Icon' src={ActivityIcon} />
      Activities
      </div>
      </div>
    </div>
  )
}
