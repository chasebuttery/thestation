import firebase from '../firebase'
import Auth from '../Auth'




export async function setMetaData(sessionID, Data) {
  const newResponse= firebase.firestore()
  .collection('Sessions').doc(sessionID)
  .update({
    MetaData: Data
  })
}

export async function addUserResponse(sessionID, userID, responseData) {


  const newResponse= firebase
  .firestore()
  .collection('Sessions')
  .doc(sessionID)
  .collection('Users').doc(userID)
  .update({
    responses: responseData
  })
  .then(function (docRef) {
    //console.log('Document written with ID: ', docRef.id)
  })
  .catch(function (error) {
    console.error('Error adding document: ', error)
  })

}


export async function addToPlayerScore(sessionID, userID, score) {


  console.log(score)

  if(score > 0){
  const increment = firebase.firestore.FieldValue.increment(score);


  const newResponse= firebase
  .firestore()
  .collection('Sessions')
  .doc(sessionID)
  .collection('Users').doc(userID)
  .update({
    score: increment
  })
  .then(function (docRef) {
    //console.log('Document written with ID: ', docRef.id)
  })
  .catch(function (error) {
    console.error('Error adding document: ', error)
  })
}

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
      slideNum: -1,
      gameOver: false
    })
    .then(function (docRef) {
      //console.log('Document written with ID: ', docRef.id)
    })
    .catch(function (error) {
      console.error('Error adding document: ', error)
    })

}

// export async function createSession(stationID, newID) {
//   console.log('create new Session in firestore')
//   const userName = Auth.getUserName()
//   const profileImg = Auth.getProfileImg()

//   const newSession= firebase
//     .firestore()
//     .collection('Sessions')
//     .doc(newID)
//     .set({
//       sessionID: newID,
//       stationID: stationID,
//       hostName: userName,
//       hostImg: profileImg,
//       slideNum: 0
//     })
//     .then(function (docRef) {
//       //console.log('Document written with ID: ', docRef.id)
//     })
//     .catch(function (error) {
//       console.error('Error adding document: ', error)
//     })

// }


export async function incrementSlide(sessionID){

    console.log(sessionID)


    const increment = firebase.firestore.FieldValue.increment(1);

  const nextSlide= firebase
  .firestore()
  .collection('Sessions')
  .doc(sessionID)
  .update({
      slideNum: increment,
      state: 'reset'
  })
  .then(function (docRef) {
    //console.log('Document written with ID: ', docRef.id)
    console.log("do it")
  })
  .catch(function (error) {
    console.error('Error adding document: ', error)
  })
}

export  function setSlideState(sessionID, state){
  firebase.firestore()
  .collection('Sessions').doc(sessionID)
  .update({
      state: state 
  })
}

// export async function getUsersList(sessionID){
//     // const users = firebase.firestore().collection('Sessions').doc(sessionID).collection('Users').get()
//     // return users


//     const users = firebase.firestore().collection('Sessions').doc(sessionID).collection('Users')
//     .onSnapshot(function(doc) {
//         var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
//         console.log(source, " data: ", doc.data());
       
//     });

// }


export async function getUsersList(handleUsersRefresh,sessionID){

  const users = firebase.firestore().collection('Sessions').doc(sessionID).collection('Users').onSnapshot(function(doc) {
        handleUsersRefresh(doc)
    });

}

export async function getSessionData(handleSessionRefresh, sessionID){
    const session = firebase.firestore().collection('Sessions').doc(sessionID).onSnapshot(function(doc) {
        handleSessionRefresh(doc.data())
    });
}

export async function getStationID(sessionID){
    const session = firebase.firestore().collection('Sessions').doc(sessionID).get()
  return session.stationID
}


export async function addUserToSession(sessionID, newUserID, user){
    console.log(sessionID)
    console.log(user)

  const newUser= firebase
  .firestore()
  .collection('Sessions')
  .doc(sessionID)
  .collection('Users').doc(newUserID)
  .set({
      id: newUserID,
      name: user.name

  })
  .then(function (docRef) {
    //console.log('Document written with ID: ', docRef.id)
  })
  .catch(function (error) {
    console.error('Error adding document: ', error)
  })
}

export function listenUserData(sessionID, userID, listener){
  
  let docRef = firebase.firestore()
    .collection('Sessions').doc(sessionID)
    .collection('Users').doc(userID).onSnapshot(
      snap => listener(snap.data())
  )

}


export async function getUserData(sessionID, userID){

  console.log(sessionID, userID)

  let docRef = firebase
  .firestore()
  .collection('Sessions')
  .doc(sessionID).collection('Users').doc(userID)

let docData

const userData = docRef
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
return userData

}

export  function setGameOverDB(sessionID){
  firebase.firestore()
  .collection('Sessions').doc(sessionID)
  .update({
      gameOver: true
  })
}
