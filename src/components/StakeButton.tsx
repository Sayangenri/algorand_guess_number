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
    <button
      onClick={stakeToPlay}
      disabled={!account}
      className={`px-6 py-3 text-lg font-semibold rounded-xl shadow-md transition
        ${account
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90"
          : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
    >
      💰 Stake 0.01 ALGO to Play
    </button>
  );
};

export default StakeButton;
