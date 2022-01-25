import React, { useState } from 'react'

export default function Host (props) {
  const {users} = props
  const [highScore, setHighScore] = useState(0)
  const [scorer, setScorer] = useState("")


  console.log(users)


  function getWinner() {
      //go through users array and find user with highest score
      for (let i = 0; i < users.length; i++) {
        const user = users[i]

        if(user?.responses){
            if(user?.score > highScore){
                console.log("he... " + user.name  + " has highest sscore off... " + user.score)
              setHighScore(user.score)
              setScorer(user.name)
           
                
            }
        }
    }
  }

  getWinner()

  return (
    <div className='EndGame'>
      
      <h1> End of game </h1>
      <h3> Winner was {scorer} with...  {highScore} point(s)</h3>


    </div>
  )
}
