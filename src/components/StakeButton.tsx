import React from "react";
import { sendStake } from "../algorand/stake";

interface Props {
  account: string;
  onSuccess: (num: number) => void;
  onError: () => void;
}

const StakeButton: React.FC<Props> = ({ account, onSuccess, onError }) => {
  const stakeToPlay = async () => {
    try {
      await sendStake(account);
      const num = Math.floor(Math.random() * 10) + 1;
      console.log("Stake txn successful, random number:", num);
      onSuccess(num);
    } catch (err) {
      console.error("Stake txn failed", err);
      onError();
    }
  };

  return (
    <div className="relative group">
      {/* Geometric background accent */}
      <div className="absolute -inset-1 opacity-50 group-hover:opacity-80 transition-opacity duration-300">
        <div className="w-full h-full bg-white/10 transform rotate-1"></div>
      </div>
      
      <button
        onClick={stakeToPlay}
        disabled={!account}
        className={`relative px-12 py-6 font-bold text-lg tracking-wider uppercase transition-all duration-300 border-2
          ${account
            ? "bg-white/10 hover:bg-white/20 border-white/40 hover:border-white text-white hover:scale-105 active:scale-95"
            : "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
          }`}
        style={{ 
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
        }}
      >
        {/* Button content */}
        <div className="flex items-center justify-center space-x-4">
          {/* Algorand-style geometric icon */}
          <div className={`w-6 h-6 relative transition-all duration-300 ${account ? 'group-hover:animate-pulse' : ''}`}>
            <div className={`absolute inset-0 transform rotate-45 transition-colors duration-300 ${
              account ? 'bg-white group-hover:bg-white' : 'bg-gray-600'
            }`}></div>
            <div className={`absolute inset-1 transform rotate-45 transition-colors duration-300 ${
              account ? 'bg-black' : 'bg-gray-700'
            }`}></div>
            <div className={`absolute inset-2 transform rotate-45 transition-colors duration-300 ${
              account ? 'bg-white group-hover:bg-white' : 'bg-gray-600'
            }`}></div>
          </div>
          
          <span className="relative z-10">
            Stake 0.1 ALGO
          </span>
        </div>

        {/* Hover effect overlay */}
        {account && (
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style={{ 
                 clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
               }}>
          </div>
        )}

        {/* Active indicator */}
        {account && (
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        )}
      </button>

      {/* Bottom text */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">
          Initialize Game Protocol
        </p>
        <div className="mt-2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default StakeButton;