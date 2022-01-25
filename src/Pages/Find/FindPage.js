import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import StationCard from '../../Components/Station/StationCard'
import {getStationList} from '../../Backend/StationsDB'
import './FindPage.scss'

export default function FindPage () {

const [stations, setStations] = useState([])

  useEffect(() => {
    async function getStations () {
      const list = await getStationList()
      setStations(list.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    }
    getStations()
  }, [])
  console.log(stations)


  return (
    <div className = "FindPage">
      <h1>Find</h1>
      <p>find a station to host</p>
      <div className='Search'>
            Search
            <input id = 'search' type='text' />
          </div>

      <div className='StationFind'>
        <div className='Stations'>
          {stations.map(station => (
            <div key = {station.id}>
              <StationCard station={station} />
            </div>
          ))}
        </div>
      

      </div>
      
    </div>
  )
}
