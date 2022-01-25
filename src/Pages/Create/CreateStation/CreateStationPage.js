import React, { useState, useEffect } from 'react'
import firebase from '../../../firebase'
import {
  addImgToStation,
  addVidToStation,
  getStationData,
  updateSlides
} from '../../../Backend/StationsDB'
import { Link } from 'react-router-dom'
import ContentInputCard from '../../../Components/Content/ContentEditor/ContentInputCard'
import FakeoutInputCard from '../../../Components/Fakeout/FakeoutEditor/FakeoutInputCard'
import QuestionForm from '../../../Components/MultipleChoice/MCEditor/MultipleChoiceInputCard'
import StationSequence from './SequenceBar/StationSequence'
import DiscussionInputCard from '../../../Components/Discussion/DiscussionEditor/DiscussionInputCard'
import './CreateStationPage.scss'
import FakeoutIcon from '../../../Images/Icons/fakeouticon.png'

import ContentIcon from '../../../Images/Icons/Content.png'

import DiscussionIcon from '../../../Images/Icons/discussion.png'

import TriviaIcon from '../../../Images/Icons/trivia.png'


export default function CreateStationPage (props) {
  const { stationID } = props.match.params
  const [station, setStation] = useState([])
  const [slides, setSlides] = useState(  [
    {
      type: 'content',
      title: 'Title'
    }
  ])
  const [slideNum, setSlideNum] = useState(0);

  const [rand, setRand] = useState(0);
  const [dataDirty, setDataDirty] = useState(false);



  const selectedValue = slides[slideNum]?.type;


  useEffect(() => {
    loadStation()
  }, [stationID])
  const loadStation = async () => {
    const stationData = await getStationData(stationID)
    setStation(stationData)
    if(stationData.slides)
    setSlides(stationData.slides)
  }


  function selectCreate (e) {
    //setSelectedValue(e.target.value)
    //console.log(e.target.value)
  }

  function addSlide(e){

   // console.log("adding")



    setDataDirty(true);
    setSlideNum(slides.length);
      if(e.target.value === 'fakeout')
        setSlides([...slides, {
          type: 'fakeout',
          question: '', 
          title: '',
        } ])
      if(e.target.value === 'content')
        setSlides([...slides, {
          type: 'content',
          title: '',
        } ])
      if(e.target.value === 'multipleChoice')
        setSlides([...slides, {
          type: 'multipleChoice',
          question: '', A: '', B: '', C: '', D: '', Aans: false, Bans: false, Cans: false, Dans: false
        } ])
        if (e.target.value === "discussion")
          setSlides([
            ...slides,
            {
              type: "discussion",
              question: ""
            },
          ]);
  }

  const updateData = (id, value) => {
    var q = slides;
    q[slideNum][id] = value;
    setSlides(q);

    setRand(Math.random() + rand); //force page update

    setDataDirty(true);
  }

  function save(e){
    
    setDataDirty(false);
    updateSlides(stationID, slides)

  }

  return (
    <div className="CreateStationPage">
      <h10>{stationID}</h10>
      <button className = "SaveButton" onClick={save}>Save</button>
      {dataDirty && "Unsaved Changes!"}

      <p>here are the tools to create your {station?.title} station</p>


        <div className="AddOptions">


        <div className = "Option">
          <img className = "Icon" src = {ContentIcon} />
          <button value="content" onClick={addSlide}>
            {" "}
            add content{" "}
          </button>
          </div>

          <div className = "Option">
          <img className = "Icon" src = {FakeoutIcon} />
          <button value="fakeout" onClick={addSlide}>
            {" "}
            add fakeout{" "}
          </button>
          </div>

          {/* <button value="fakeout" onClick={addSlide}>
            {" "}
            add fakeout{" "}
          </button> */}
          <div className="Option">

          <img className = "Icon" src = {TriviaIcon} />
          <button value="multipleChoice" onClick={addSlide}>
            {" "}
            add trivia{" "}
          </button>
          </div>
          <div className = "Option">

          <img className = "Icon" src = {DiscussionIcon} />
          <button value="discussion" onClick={addSlide}>
            {" "}
            add discussion{" "}
          </button>
          </div>

      </div>
          
        <div className="InputCard">
          {selectedValue === "content" && (
            <ContentInputCard data={slides[slideNum]} updateData={updateData} />
          )}
          {selectedValue == "fakeout" && (
            <FakeoutInputCard data={slides[slideNum]} updateData={updateData} />
          )}
          {selectedValue == "multipleChoice" && (
            <QuestionForm data={slides[slideNum]} updateData={updateData} />
          )}
          {selectedValue == "discussion" && (
            <DiscussionInputCard data={slides[slideNum]} updateData={updateData} />
          )}
        </div>


        <div className = "Sequence">
        <StationSequence
            stationID={stationID}
            slides={slides}
            setSlide={setSlideNum}
          />
          </div>
    </div>
  );
}
