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
    <button
      onClick={connectWallet}
      className="mb-6 px-6 py-3 text-lg font-semibold rounded-xl shadow-md 
                 bg-gradient-to-r from-green-600 to-emerald-500 text-white 
                 hover:opacity-90 transition"
    >
      🔗 Connect Pera Wallet
    </button>
  );
};

export default WalletButton;
