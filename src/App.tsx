import React, { useState } from "react";
import WalletButton from "./components/WalletButton";
import StakeButton from "./components/StakeButton";
import GuessGame from "./components/GuessGame";

const App: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black px-4 py-8 relative overflow-hidden">
      {/* Algorand-inspired geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-white rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-white rotate-45 animate-spin" style={{ animationDuration: '15s' }}></div>
          <div className="absolute top-2/3 left-1/2 w-20 h-20 border border-white rotate-45 animate-spin" style={{ animationDuration: '25s' }}></div>
        </div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-gray-900/50"></div>
      </div>

      {/* Game Container */}
      <div className="relative w-full max-w-2xl bg-white/5 backdrop-blur-sm rounded-none border-2 border-white/20 p-8 lg:p-12" style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}>
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            {/* Algorand-style logo placeholder */}
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="absolute inset-0 bg-white transform rotate-45"></div>
              <div className="absolute inset-2 bg-black transform rotate-45"></div>
              <div className="absolute inset-4 bg-white transform rotate-45"></div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white tracking-wider mb-2">
              NUMBER GUESS GAME
            </h1>
            <div className="text-sm text-gray-400 font-mono tracking-[0.3em] uppercase">
              ALGORAND POWERED
            </div>
          </div>
          <p className="text-lg text-gray-300 font-light tracking-wide max-w-md mx-auto">
            Stake ALGO → Generate Number → Make Your Guess → Win Rewards
          </p>
          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>

        {/* Game Flow */}
        <div className="flex flex-col items-center space-y-10">
          {/* Wallet Connection */}
          {!account ? (
            <div className="text-center space-y-8 w-full max-w-md">
              <div className="p-8 bg-white/5 border border-white/20 relative" style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}>
                <div className="w-12 h-12 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-white/20 transform rotate-45"></div>
                  <div className="absolute inset-2 bg-white/40 transform rotate-45"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">CONNECT WALLET</h3>
                <p className="text-gray-400 font-light">Initialize your Algorand wallet connection</p>
              </div>
              <WalletButton setAccount={setAccount} />
            </div>
          ) : (
            <div className="w-full max-w-lg space-y-8">
              {/* Connected Wallet Display */}
              <div className="p-6 bg-white/5 border border-white/30 relative" style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-3"></div>
                  <span className="text-white font-semibold text-sm tracking-wider uppercase">Wallet Connected</span>
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse ml-3"></div>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs font-mono mb-2 uppercase tracking-widest">Address:</p>
                  <div className="bg-black/40 border border-white/20 p-3">
                    <span className="text-white break-all font-mono text-xs tracking-wider">
                      {account}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stake or Game Section */}
              {randomNumber === null ? (
                <div className="space-y-6">
                  <div className="p-8 bg-white/5 border border-white/20 text-center relative" style={{ clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))' }}>
                    <div className="w-12 h-12 mx-auto mb-4 relative">
                      <div className="absolute inset-0 bg-white/30 transform rotate-45"></div>
                      <div className="absolute inset-2 bg-white/60 transform rotate-45"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-wide">INITIALIZE GAME</h3>
                    <p className="text-gray-400 font-light">Stake 1 ALGO to generate secure random number</p>
                  </div>
                  <div className="flex justify-center">
                    <StakeButton
                      account={account}
                      onSuccess={(num) => {
                        setRandomNumber(num);
                        setMessage("Stake received ✅ You can now play!");
                      }}
                      onError={() => setMessage("❌ Failed to stake, check console.")}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-white/5 border border-white/30 relative" style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}>
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 mx-auto mb-4 relative">
                      <div className="absolute inset-0 bg-white transform rotate-45"></div>
                      <div className="absolute inset-2 bg-black transform rotate-45"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-wide">GAME ACTIVE</h3>
                    <p className="text-gray-400 mt-2 font-light">Random number generated and secured</p>
                  </div>
                  <GuessGame
                    account={account!}
                    randomNumber={randomNumber}
                    resetGame={() => setRandomNumber(null)}
                    setMessage={setMessage}
                  />
                </div>
              )}
            </div>
          )}

          {/* Status Message */}
          {message && (
            <div className="w-full max-w-lg">
              <div className="p-6 bg-white/5 border border-white/40 relative" style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <h2 className="text-sm font-mono text-white text-center tracking-wider uppercase">{message}</h2>
                  <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center border-t border-white/10 pt-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 bg-white/20 transform rotate-45"></div>
              <div className="absolute inset-2 bg-white/40 transform rotate-45"></div>
            </div>
            <p className="text-gray-400 text-xs font-mono tracking-[0.2em] uppercase">
              Algorand Blockchain Technology
            </p>
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 bg-white/20 transform rotate-45"></div>
              <div className="absolute inset-2 bg-white/40 transform rotate-45"></div>
            </div>
          </div>
          <p className="text-gray-500 text-xs font-mono tracking-wider">
            SECURE • FAST • SUSTAINABLE • DECENTRALIZED
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;