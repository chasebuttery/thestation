import firebase from '../firebase'
import Auth from '../Auth'


export async function addStation (station) {
  console.log('add Station to firestore')
  const userName = Auth.getUserName()
  const profileImg = Auth.getProfileImg()

  const newStation = firebase
    .firestore()
    .collection('Stations')
    .add({
      stationID: '',
      creatorID: userName,
      creatorImage: profileImg,
      title: station.title,
      category: station.category,
      description: station.description,
      crewSize: station.crewSize,
      time: station.time,
      share: station.share
    })
    .then(function (docRef) {
      console.log('Document written with ID: ', docRef.id)
      setStationID(docRef.id)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })

  function setStationID (id) {
    const newStationID = firebase
      .firestore()
      .collection('Stations')
      .doc(id)
      .update({
        stationID: id
      })
  }
}

export async function createStation (station, newID) {
  console.log('add Station to firestore')
  const userName = Auth.getUserName()
  const profileImg = Auth.getProfileImg()

  const newStation = firebase
    .firestore()
    .collection('Stations')
    .doc(newID)
    .set({
      stationID: newID,
      creatorID: userName,
      creatorImage: profileImg,
      title: station.title,
      category: station.category,
      description: station.description
    })
    .then(function (docRef) {
      //console.log('Document written with ID: ', docRef.id)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })

  // function setStationID (id) {
  //   const newStationID = firebase
  //     .firestore()
  //     .collection('Stations')
  //     .doc(id)
  //     .update({
  //       stationID: id
  //     })
  // }
}

export async function addImgToStation (imgContent, stationID) {
  const newStation = firebase
    .firestore()
    .collection('Stations')
    .doc(stationID)
    .update({
      sequence: firebase.firestore.FieldValue.arrayUnion(imgContent)
    })
    .then(function (docRef) {
      //console.log('Document written with ID: ', docRef.id)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })
}

export async function addVidToStation (vidContent, stationID) {}

export async function addFakeoutToStation(fakeout, stationID){
  const newStation = firebase
  .firestore()
  .collection('Stations')
  .doc(stationID)
  .update({
    sequence: firebase.firestore.FieldValue.arrayUnion(fakeout)
  })
  .then(function (docRef) {
    //console.log('Document written with ID: ', docRef.id)
  })
  .catch(function (error) {
    console.error('Error adding document: ', error)
  })

  
}

export async function getStationData (stationID) {
  let docRef = firebase
    .firestore()
    .collection('Stations')
    .doc(stationID)

  let docData

  const stationData = docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        console.log('Document data:', doc.data())
        docData = doc.data()
        return docData
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
        return docData
      }
    })
    .catch(function (error) {
      console.log('Error getting document:', error)
    })
  return stationData
}

export function updateSlides(stationID, slides){
  firebase.firestore().collection('Stations').doc(stationID).update({
    slides
  })
}


export async function getStationList() {
  const stations = firebase.firestore().collection('Stations').get()
  return stations
}


export async function getStation(stationID){


  console.log(stationID)
  const stations = firebase.firestore().collection('Stations').doc(stationID).get()
  return stations
}




export async function addUserToActivity (activityID) {
  const userName = Auth.getUserName()
  const profileImg = Auth.getProfileImg()

  console.log('put user in firestore')
  const activities = firebase
    .firestore()
    .collection('Activities')
    .doc(activityID)
    .collection('MembersGoing')
    .doc(userName)
    .set({
      name: userName,
      profileImg: profileImg
    })
  return activities
}

export async function deleteUserFromActivity (activityID) {
  const userName = Auth.getUserName()

  const deleteUser = firebase
    .firestore()
    .collection('Activities')
    .doc(activityID)
    .collection('MembersGoing')
    .doc(userName)
    .delete()
}

export async function createSession(stationID, newID) {
  console.log('create new Session in firestore')
  const userName = Auth.getUserName()
  const profileImg = Auth.getProfileImg()

  const newSession= firebase
    .firestore()
    .collection('Sessions')
    .doc(newID)
    .set({
      sessionID: newID,
      stationID: stationID,
      hostName: userName,
      hostImg: profileImg,
      slideNum: 0
    })
    .then(function (docRef) {
      //console.log('Document written with ID: ', docRef.id)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })

}