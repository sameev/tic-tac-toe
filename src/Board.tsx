import { useEffect, useState } from 'react'
import Square from './Square';
import ResetButton from './ResetButton';

// const initialGameState = new Array(9).fill("X");
const initialGameState = ["","","","","","","","",""]

const Board = () => {
  const [ gameState, setGameState ] = useState(initialGameState);
  const [ currentPlayer, setCurrentPlayer ] = useState("X");

  useEffect(() => {
    checkForWinner();
    changePlayer();
  },[gameState])

  const winningCombinations = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
  ]

  const checkForWinner = () => {
    let roundWon = false;
    for(let i = 0; i < winningCombinations.length; i++) {
      const winCombo = winningCombinations[i];

      let a = gameState[winCombo[0]];
      let b = gameState[winCombo[1]];
      let c = gameState[winCombo[2]];

      if([a,b,c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    const handleWin = () => {
      window.alert(`Player ${currentPlayer} wins!`);
    }
  
    if(roundWon) {
      setTimeout( () => handleWin(), 100)
      return;
    }  

    const handleDraw = () => {
      window.alert(`The game has ended in a draw`);
    }
    
    if (!gameState.includes("")) {
      setTimeout( () => handleDraw(), 100)
    }
  }

  const handleClick = (e: any) => {
    const cellIndex = Number(e.target.getAttribute('data-cell-index'));

    const currentValue = gameState[cellIndex];
    if (currentValue) return

    const newValues = [...gameState]
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  }

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  }

  const handleReset = () => {
    setGameState(initialGameState)
  }

  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-purple-500">
      <h1 className='text-center text-5xl mb-4 font-display text-white'>
        Tic Tac Toe
      </h1>

      <ResetButton {...{handleReset, gameState}} />

      <div className='grid grid-cols-3 gap-3 mx-auto w-96'>
        {gameState.map( (player, index) => (
          <Square 
            key={index} 
            {...{index, player}} 
            onClick={handleClick} 
          />
        ))}
      </div>

      <div>
        Scores Go Here
      </div>
    </div>
  )
}

export default Board
