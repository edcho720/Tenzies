import React from 'react'
// import Squares from './Squares'
// import Form from "./extra.js/Form"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

/* new features: 
add real dots, (meh)
track num of rolls, (done)
track time, (meh)
save best (done) but not to local storage
*/

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [rolls, setRolls] = React.useState(0);//to keep track of num of rolls per game
  const [bestScore, setBestScore] = React.useState(25)//to keep track of high scores
  const [tenzies, setTenzies] = React.useState(false); // default to false

  React.useEffect(() => { // must check if the game is won
    const allHeld = dice.every(die => die.isHeld) // using the every method to check
    const firstValue = dice[0].value // that all values are equal and all are being held
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) { // if both cases are true...
        setTenzies(true); // then we setTenzies to true
        console.log("You won!");// simple console log of winning notification
        setBestScore(prevBestScore => rolls < prevBestScore ? rolls : prevBestScore);
        if(rolls < bestScore) {console.log("New Best Score!")}
        setRolls(0);
      }

}, [dice])// our dependancies array will keep track of state changes in our dice


  function allNewDice() { // a func to generate a random set of 10 nums
    const arrayOfTen = [];
    let n = 0;
    while(n < 10) {
      arrayOfTen.push( generateNewDie());
      // to turn the array of random numbers into an object...
      //   {              // just push as an object with the properties we want
      //     value : Math.ceil(Math.random() * 6), 
      //     isHeld: false, // adding the isHeld property manually
      //     id: nanoid()
      //   }
      n++;
    }
    return arrayOfTen; // random array -> obj of 10 random nums
  }

  function generateNewDie() {// to turn the array of random numbers into an object...
    return { // just push as an object with the properties we want
      value : Math.ceil(Math.random() * 6), 
      isHeld: false, // adding the isHeld property manually
      id: nanoid()
    };
  }

  function rollDice() {
    if(tenzies) { // check is game is won, if so, reset the game
      setTenzies(prevTenzies => !prevTenzies);
      setDice(allNewDice());
    };

    // setDice(prevDice => allNewDice());// re-rolling dice
    setRolls(prevRolls=> prevRolls + 1)// keeping count of num of rolls per game
    setDice( prevDice => prevDice.map( die => {
      return die.isHeld ? die : generateNewDie()
    }))
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map( die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
  }))
  }

  const diceElements = dice.map( dieNum => {
    return <Die 
              key={dieNum.id} 
              value={dieNum.value}
              isHeld={dieNum.isHeld}
              handleClick={() => holdDice(dieNum.id)}
            /> // change to dieNum.value bc now we are mapping over an object
  })

  return (
    <main>
      {tenzies && <Confetti />}
      {/* <Squares />
      <Form /> */}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>  
      <button 
        className="roll-button"
        onClick={rollDice}
        >{tenzies ? "New Game" : "Roll"}</button>
        <h6 className="total-rolls">Rolls: {rolls}</h6>
        <h5 className="high-score">Best Score: {bestScore}</h5>
    </main>
  )
  
}

export default App;
