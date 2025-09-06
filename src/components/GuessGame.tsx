import React, { useState } from "react";
import { sendReward } from "../algorand/reward";

interface Props {
  account: string;
  randomNumber: number;
  resetGame: () => void;
  setMessage: (msg: string) => void;
}

const GuessGame: React.FC<Props> = ({
  account,
  randomNumber,
  resetGame,
  setMessage,
}) => {
  const [guess, setGuess] = useState("");

  const makeGuess = async () => {
    if (parseInt(guess) === randomNumber) {
      setMessage(`🎉 Correct! Number was ${randomNumber}. You win 0.2 ALGO`);
      try {
        await sendReward(account);
      } catch (err) {
        console.error("Reward txn failed", err);
        setMessage("You guessed right, but reward txn failed ❌");
      }
    } else {
      setMessage(`❌ Wrong! Number was ${randomNumber}. You lose your stake.`);
    }
    resetGame();
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center border border-gray-200">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">
          🔢 Guess the Number
        </h2>
        <p className="text-gray-600 mb-6">Pick a number between <b>1–10</b></p>

        <div className="flex justify-center items-center gap-4 mb-6">
          <input
            type="number"
            min="1"
            max="10"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="w-20 text-center p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
          />
          <button
            onClick={makeGuess}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
          >
            Submit
          </button>
        </div>

        <p className="text-sm text-gray-400">💡 Tip: Correct guess earns rewards!</p>
      </div>
    </div>
  );
};

export default GuessGame;
