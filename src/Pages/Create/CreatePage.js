import React, { useState } from 'react'
import { addStation, createStation } from '../../Backend/StationsDB'
import { Link, useHistory } from 'react-router-dom'
import './CreatePage.scss'

export default function CreatePage () {
  const [station, setStation] = useState({
    stationID: '',
    title: '',
    category: '',
    description: ''
  })

  const history = useHistory()

  function handleTitleChange (event) {
    const titleValue = event.target.value
    setStation(curActivity => {
      return {
        ...curActivity,
        title: titleValue
      }
    })
  }
  function handleCategoryChange (event) {
    const categoryValue = event.target.value
    setStation(curActivity => {
      return {
        ...curActivity,
        category: categoryValue
      }
    })
  }
  function handleDescriptionChange (event) {
    const descriptionValue = event.target.value
    setStation(curActivity => {
      return {
        ...curActivity,
        description: descriptionValue
      }
    })
  }

  function startCreateStation (event) {

    //Generates StationID
    let stationString =
      'station' +
      Math.random()
        .toString(36)
        .substring(7)
    let stationNum = Math.floor(1000 + Math.random() * 9000)
    const newID = stationString + stationNum

    setStation(curActivity => {
      return {
        ...curActivity,
        stationID: newID
      }
    })
    createStation(station, newID)

    history.push('/create/' + newID)
    event.preventDefault()
  }

  return (
    <div className='CreatePage'>
      <h1>Create</h1>
      <p>
        create an interactive station with content, trivia, games, and
        activities
      </p>
      <form className='CreatePageForm'>
        <div className="input">
          <label > title </label>
          <input id='title' type='text' name='title' onChange={handleTitleChange} />
        </div>
        <div className="input">
          <label > category </label>
          <input id='category' type='text' name='category' onChange={handleCategoryChange} />
        </div>
        <div className="input">
          <label> description </label>
          <input type='text' name='description' onChange={handleDescriptionChange} />
        </div>
        <button className='CreateButton' type='submit' onClick={startCreateStation}> START CREATING! </button>
      </form>
    </div>
  )
}
