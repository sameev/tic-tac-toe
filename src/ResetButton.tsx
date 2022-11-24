//need to add functionality to change button to "play again" after a win (currently only changes after draw)

import { useEffect } from "react";

type Props = {
  handleReset(e: any): void;
  gameState: string[];
};

const ResetButton = ({ handleReset, gameState }: Props) => {
  useEffect(() => {});
  return (
    <div className="flex justify-center py-1">
      <button
        onClick={handleReset}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full border border-gray-400"
      >
        {!gameState.includes("") ? "Play Again" : "Restart Game"}
      </button>
    </div>
  );
};

export default ResetButton;
