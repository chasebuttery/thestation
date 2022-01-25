import React from 'react'
import { Route } from 'react-router-dom'
import AuthRoute from './AuthRoute'
import HomePage from './Pages/Home/HomePage'
import ProfilePage from './Pages/Profile/ProfilePage'
import CreatePage from './Pages/Create/CreatePage'
import CreateStationPage from './Pages/Create/CreateStation/CreateStationPage'
import FindPage from './Pages/Find/FindPage'
import JoinPage from './Pages/Join/JoinPage'
import MyStationsPage from './Pages/MyStations/MyStationsPage'
import GameHostPage from './GamePlay/GameHostPage'
import GameUserPage from './GamePlay/GameUserPage'

export default function Routes () {
  return (
    <div className='routes'>
      <Route exact path='/' component={HomePage} />
      <Route exact path='/profile' component={ProfilePage} />
      <Route exact path='/create' component={CreatePage} />
      <Route exact path='/create/:stationID' component={CreateStationPage} />
      <Route exact path='/find' component={FindPage} />
      <Route exact path = '/play/host/:sessionID' component = {GameHostPage} />
      <Route exact path = '/play/user/:sessionID/:userID' component = {GameUserPage} />
      <Route path='/join' component={JoinPage} />
      <Route exact path='/myStations' component={MyStationsPage} />
    </div>
  )
}
