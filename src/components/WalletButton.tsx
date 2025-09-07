import React from "react";
import { peraWallet } from "../algorand/config";

interface Props {
  setAccount: (acc: string) => void;
}

const WalletButton: React.FC<Props> = ({ setAccount }) => {
  const connectWallet = async () => {
    try {
      const accounts = await peraWallet.connect();
      setAccount(accounts[0]);
    } catch (e) {
      console.error("Couldn't connect to wallet", e);
    }
  };

  return (
    <div className="relative group">
      {/* Geometric background layers */}
      <div className="absolute -inset-2 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
        <div className="w-full h-full bg-white/10 transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
      </div>
      <div className="absolute -inset-1 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className="w-full h-full bg-white/10 transform -rotate-1 group-hover:-rotate-2 transition-transform duration-300"></div>
      </div>
      
      <button
        onClick={connectWallet}
        className="relative px-16 py-8 bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white 
                   text-white font-bold text-xl tracking-wider uppercase transition-all duration-300
                   hover:scale-105 active:scale-95 shadow-2xl hover:shadow-white/10"
        style={{ 
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
        }}
      >
        {/* Button content */}
        <div className="flex items-center justify-center space-x-6">
          {/* Pera Wallet icon representation */}
          <div className="relative w-8 h-8 group-hover:animate-pulse">
            <div className="absolute inset-0 bg-white transform rotate-45"></div>
            <div className="absolute inset-1 bg-black transform rotate-45"></div>
            <div className="absolute inset-0 border border-white/50 transform rotate-45"></div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-black tracking-[0.2em]">
              CONNECT WALLET
            </div>
            <div className="text-xs text-gray-300 font-mono tracking-[0.3em] mt-1">
              PERA PROTOCOL
            </div>
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
             style={{ 
               clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
             }}>
        </div>

        {/* Corner accents */}
        <div className="absolute top-3 right-3 w-3 h-3">
          <div className="w-full h-full bg-white/30 transform rotate-45 group-hover:bg-white/50 transition-colors duration-300"></div>
        </div>
        <div className="absolute bottom-3 left-3 w-3 h-3">
          <div className="w-full h-full bg-white/20 transform rotate-45 group-hover:bg-white/40 transition-colors duration-300"></div>
        </div>
      </button>

      {/* Connection status indicator */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/20"
             style={{ 
               clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
             }}>
          <div className="w-2 h-2 bg-white/50 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400 font-mono tracking-[0.2em] uppercase">
            Wallet Disconnected
          </span>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default WalletButton;