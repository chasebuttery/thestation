import React, { useState } from 'react'
import './StationSequence.scss'
import ContentIcon from '../../../../Images/Icons/Content.png'

import FakeoutIcon from '../../../../Images/Icons/fakeouticon.png'

import MultipleChoiceIcon from '../../../../Images/Icons/trivia.png'
import DiscussionIcon from '../../../../Images/Icons/discussion.png'

export default function StationSequence (props) {
  const { stationID, slides, setSlide } = props

  

  function itemCard (num, title, question, type){
    return (
      <div className='SequenceSlide' onClick={e => {e.preventDefault(); setSlide(num);}}>
        {num+1}
        {'  '}
        {title}
        {question}
        {'  ('}
        {type}
        {')'}

        {(type == 'content') &&
        <img className='Icon' src={ContentIcon} />
        }
        {(type == 'multipleChoice') &&
        <img className='Icon' src={MultipleChoiceIcon} />
        }
          {(type == 'fakeout') &&
        <img className='Icon' src={FakeoutIcon} />
        }
         {(type == 'discussion') &&
        <img className='Icon' src={DiscussionIcon} />
        }


      </div>
    )
  }

  return (
    <div className='StationSequence'>
      {slides.map((element, num) => 
        <div> 
          {itemCard(num,element.title, element.question, element.type)}
        </div>
      )}

    </div>
  )
}
