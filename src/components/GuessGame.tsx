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
    <div className="flex justify-center mt-8">
      <div className="bg-white/5 border-2 border-white/20 w-full max-w-lg relative backdrop-blur-sm" style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}>
        {/* Algorand-style geometric accent */}
        <div className="absolute top-4 right-4 w-8 h-8">
          <div className="absolute inset-0 bg-white/20 transform rotate-45"></div>
          <div className="absolute inset-2 bg-white/40 transform rotate-45"></div>
        </div>

        {/* Header */}
        <div className="bg-white/10 border-b border-white/20 py-6 px-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 relative">
              <div className="absolute inset-0 bg-white transform rotate-45"></div>
              <div className="absolute inset-1 bg-black transform rotate-45"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-wider uppercase">
                Guess Number
              </h2>
              <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">
                Stake & Win Protocol
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 text-center">
          <div className="mb-8">
            <p className="text-gray-300 mb-2 text-sm font-mono tracking-wider uppercase">
              Range: 1-10
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6"></div>
          </div>

          <div className="flex justify-center items-center gap-6 mb-8">
            {/* Input Field */}
            <div className="relative">
              <input
                type="number"
                min="1"
                max="10"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                className="w-20 h-16 text-2xl text-center font-bold bg-black/40 text-white border-2 border-white/30 
                          focus:border-white focus:outline-none transition-all duration-300"
                style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                placeholder="?"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={makeGuess}
              disabled={!guess}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 disabled:bg-white/5 border-2 border-white/30 
                        hover:border-white disabled:border-white/10 text-white font-bold tracking-wider uppercase
                        transition-all duration-300 relative group disabled:cursor-not-allowed"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <span className="relative z-10">Submit</span>
              <div className="absolute inset-0 bg-white/5 transform scale-0 group-hover:scale-100 transition-transform duration-300" 
                   style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}></div>
            </button>
          </div>

          {/* Reward Info */}
          <div className="bg-black/20 border border-white/20 p-4 relative" style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}>
            <div className="flex items-center justify-center space-x-2 text-xs">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <span className="text-gray-400 font-mono tracking-widest uppercase">
                Reward: 0.2 ALGO on correct guess
              </span>
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Bottom geometric accent */}
        <div className="absolute bottom-4 left-4 w-6 h-6">
          <div className="absolute inset-0 bg-white/10 transform rotate-45"></div>
          <div className="absolute inset-1 bg-white/20 transform rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default GuessGame;