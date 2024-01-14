import { useState, useEffect } from 'react'
import Dice from './Dice.jsx'
import {nanoid} from "nanoid"
import './index.css'
import Confetti from 'react-confetti'

function App() {

  //the state
  const [diceValues, setDiceValues] = useState(allNewDice())

  console.log(diceValues)

  const [tenzies, setTenzies] = useState(false)
  const [rollCounter, setRollCounter] = useState(0)

  function rollCount(){
    setRollCounter(prevRoll => prevRoll+1)
  }


    
    useEffect(() => {
       const areAllEqual = diceValues.every(  
            (obj) =>
             obj.value === diceValues[0].value &&
             obj.isHeld === diceValues[0].isHeld) //checks for winning condition, when all dice same values and isHeld
        
        if(areAllEqual){
            setTenzies(true)
            console.log("You won!")
        }
        
    }, [diceValues]) //have to use state because we are syncing 2 internal states together, tenzies and diceValue, runs everytime
                     //diceValues is clicked

  function getNewDie(){
    return {value:Math.floor(Math.random() * 6) + 1,
      isHeld:false,
      id:nanoid()
      //each object should have unique id, we can import nanoid
    }
  }

  //function to generate a an array to 10 random numbers from 1-6
  function allNewDice() {
        const arrayOfRandom = []
        
        for(let i = 0; i < 10;i++){
            arrayOfRandom.push(getNewDie())
            
        }
    return arrayOfRandom
}

function multipleRoll(){ //helper function to trigger 2 functions when click on button
  roll()
  rollCount()
}


function roll(){

  if(!tenzies){ // if game is not won then execute this code
    setDiceValues(oldSetDice => oldSetDice.map(die => { // create new set if dice, oldSet turn into ...
        if(die.isHeld){ //if the isHeld is true (green), then we don't to anything to it
              return die
          } else{
              return getNewDie() //if it's not held, then we generate a new die
          }
        }
      
    ))
    
  } else { // else, this function will reset the game when pressed
    setTenzies(false)
    setDiceValues(allNewDice)
    setRollCounter(0-1)
  }
  
}

//function to hold the dice
function holdDice(id) {
  
  setDiceValues(prevDice => { // prevDice
    return prevDice.map((dice) => { //use mapping method, return new array with according to map
        if(dice.id===id){ //if dice id matches
            return {...dice, isHeld: !dice.isHeld} //return the newly changed dice, but with the state flipped
        } else {
            return dice //if not then return the exact same thing, no change
        }
    })
})
}



const diceNums = diceValues.map((die) => { 
  return  <Dice 
              key={die.id} 
              value={die.value} 
              isHeld={die.isHeld} 
              holdDice={() => holdDice(die.id)}
          />
})


  return(
    <main>
            {tenzies && <Confetti/>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceNums}
            </div>
            <h2>Roll Count: {rollCounter}</h2>
            <button onClick={multipleRoll} className="roll-dice">{tenzies ? "New Game" : "Roll" }</button>

        </main>
   
  )
  
 
}

export default App
