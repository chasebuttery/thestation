import React, { useState, useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import CollegesIcon from '../../../Images/Miami.png'
import CompaniesIcon from '../../../Images/Tenno.png'
import IndividualsIcon from '../../../Images/Individual.png'
import './FindInfoCard.scss'

export default function FindInfoCard () {
  const history = useHistory()

  return (
    <div className='FindInfoCard' onClick = {e => {history.push('/find')}}>
      
      <h1> Find</h1>
      <p> stations to host created by companies, colleges, or individual members</p>
      <div className="Icons" >
      <img className='Icon' src={CompaniesIcon} />
      <img className='Icon' src={CollegesIcon} />
      <img className='Icon' src={IndividualsIcon} />
      </div>
    </div>
  )
}
