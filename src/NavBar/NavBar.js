import React from 'react'
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './NavBar.scss'
import Logo from '../Images/Icons/logof.png'
import NavMenu from '../Images/Icons/menu1.png'
import Auth from '../Auth'

export default function NavBar () {
  const [isExpanded, setIsExpanded] = useState(true)
  const [profileIcon, setProfileIcon] = useState()

  useEffect(() => {
    async function getProfileImg () {
      const profileImg = await Auth.getProfileImg()
      setProfileIcon(profileImg)
    }
    getProfileImg()
  }, [profileIcon])

  // const profileImg =
  // THIS IS A WORKING GIT REPOSITORY
  // Auth.getProfileImg()

  function expandNavbar () {
    //console.log('something')
    setIsExpanded(!isExpanded)
  }

  return (
    <div className='NavBar'>

      <div className='Expander'>
        <button onClick={expandNavbar} className='ExpandButton'>
          <img className='ExpandIcon' src={NavMenu} />
        </button>
      </div>

      <div className='MainNav'>
        <div className='LogoLink'>
          <NavLink to='/'>
            <img className='LogoIcon' src={Logo} />
          </NavLink>
        </div>
        <div className='ProfileLink'>
          <NavLink activeClassName='active' to='/profile'>
            <img className='ProfileIcon' src={profileIcon} />
            <h1 className='Text'> profile </h1>
          </NavLink>
        </div>
      </div>
      <div
        className={isExpanded ? 'SecNav' : 'MobileNav'}
        onClick={expandNavbar}
      >
        <div>
          <NavLink className='CreateLink' activeClassName='active' to='/create'>
            <h5 className='Text'> create </h5>
          </NavLink>
        </div>
        <div className='FindLink'>
          <NavLink activeClassName='active' to='/find'>
            <h5 className='Text'>find</h5>
          </NavLink>
        </div>
        <div className='JoinLink'>
          <NavLink activeClassName='active' to='/join'>
            <h5 className='Text'> join</h5>
          </NavLink>
        </div>
        <div className='MyStationsLink'>
          <NavLink activeClassName='active' to='/myStations'>
            <h5 className='Text'>my stations</h5>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
