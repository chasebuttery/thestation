import React, { useState } from 'react'
import {addFakeoutToStation} from "../../../Backend/StationsDB"
import './FakeoutInputCard.scss'

export default function AddFakeout (props) {

  const {data, updateData} = props

  return (
    <div className='FakeoutInputCard'>
        <div className = "Field" >
          <label className = "Label" >Enter Fakeout Question</label>
          <input id = 'question' type='text' value={data['question']}  onChange={e => {updateData('question', e.currentTarget.value )}} />
        </div>
        <div className = "Field">
          <label className = "Label">Enter Correct Answer</label>
          <input id = 'answer' type='text' value={data['answer']} onChange={e => {updateData('answer', e.currentTarget.value )}} />
      </div>
    </div>
  )
}
