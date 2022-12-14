import { useEffect, useState } from "react";
import Square from "./Square";
import ResetButton from "./ResetButton";

type Scores = {
  [key: string]: number;
};

const initialGameState = new Array(9).fill("");
const initialScores: Scores = {
  X: 0,
  O: 0,
};

const Board = () => {
  const [gameState, setGameState] = useState(initialGameState);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [scores, setScores] = useState(initialScores);
  const [roundWon, setRoundWon] = useState(false);

  useEffect(() => {
    checkForWinner();
  }, [gameState]);

  const winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];
  
  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const handleReset = () => {
    setGameState(initialGameState);
    setRoundWon(false);
  };

  const handleWin = () => {
    window.alert(`Player ${currentPlayer} wins!`);
    const newPlayerScore = scores[currentPlayer] + 1;
    const newScores = { ...scores };
    newScores[currentPlayer] = newPlayerScore;
    setScores(newScores);
  };

  const checkForWinner = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const winCombo = winningCombinations[i];

      let a = gameState[winCombo[0]]; //0
      let b = gameState[winCombo[1]]; //1
      let c = gameState[winCombo[2]]; //2

      if ([a, b, c].includes("")) {
        continue;
      }

      if (a === b && b === c) {
        setRoundWon(true);
        setTimeout(() => handleWin(), 100);
        return;
      }
    }

    const handleDraw = () => {
      window.alert(`The game has ended in a draw`);
    };

    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 100);
    }

    changePlayer();
  };

  console.log(gameState);

  const handleSquareSelect = (e: any) => {
    if(roundWon) return;

    const cellIndex = Number(e.target.getAttribute("data-cell-index"));

    const currentValue = gameState[cellIndex];
    if (currentValue) return;

    const newValues = [...gameState];
    newValues[cellIndex] = currentPlayer;
    setGameState(newValues);
  };



  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-purple-500">
      <h1 className="text-center text-5xl mb-4 font-display text-white">
        Tic Tac Toe
      </h1>

      <ResetButton {...{ handleReset, gameState }} />

      <div className="flex justify-center mx-auto w-96 text-2xl text-serif">
        <p className="text-white mt-5 py-3">
          It is currently <span>{currentPlayer}'s</span> turn
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 mx-auto w-96">
        {gameState.map((player, index) => (
          <Square
            key={index}
            {...{ index, player }}
            onClick={handleSquareSelect}
          />
        ))}
      </div>

      <div className="mx-auto w-96 text-2xl text-serif">
        <p className="flex justify-center text-white mt-5">
          Player X Wins: {scores["X"]}
        </p>
        <p className="flex justify-center text-white mt-5">
          Player O Wins: {scores["O"]}
        </p>
      </div>
    </div>
  );
};

export default Board;
