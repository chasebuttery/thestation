import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import './HomePage.scss'
import StationLogo from '../../Images/stationappdemo.png'
import CreateInfoCard from './Cards/CreateInfoCard'
import JoinInfoCard from './Cards/JoinInfoCard'
import FindInfoCard from './Cards/FindInfoCard'

export default function HomePage () {
  const history = useHistory()

  return (
    <div className='HomePage'>
      <img className='LogoName' src={StationLogo} />
      <h3 className = "slogan ">learn, play, create together</h3>

       <p className= 'define'>stations are team games that include trivia, discussions, challenges, and activities</p>
      
       <div className = "LineDiv"></div>

      <div className= "Info">
      <CreateInfoCard />
      <div className = "LineDiv"></div>
      <FindInfoCard />
      <div className = "LineDiv"></div>
      <JoinInfoCard />

      </div>

    </div>
  )
}
