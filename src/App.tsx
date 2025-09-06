import React, { useState } from "react";
import WalletButton from "./components/WalletButton";
import StakeButton from "./components/StakeButton";
import GuessGame from "./components/GuessGame";

const App: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  return (
<div
  style={{
    width: "100vw",      
    height: "100vh",     
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    background: "#f9fafb",
    fontFamily: "Arial, sans-serif",
    padding: "40px",
    boxSizing: "border-box",
  }}
>

      <h1 style={{ color: "#2563eb", marginBottom: "20px" }}>
        Number Guess Game 🎲
      </h1>

      {!account ? (
        <WalletButton setAccount={setAccount} />
      ) : (
        <p style={{ marginBottom: "20px", fontWeight: "bold" }}>
          Connected: {account}
        </p>
      )}

      {randomNumber === null ? (
        account && (
          <StakeButton
            account={account}
            onSuccess={(num) => {
              setRandomNumber(num);
              setMessage("Stake received ✅ You can now play!");
            }}
            onError={() => setMessage("❌ Failed to stake, check console.")}
          />
        )
      ) : (
        <GuessGame
          account={account!}
          randomNumber={randomNumber}
          resetGame={() => setRandomNumber(null)}
          setMessage={setMessage}
        />
      )}

      {message && (
        <h2 style={{ marginTop: "30px", color: "#111827" }}>{message}</h2>
      )}
    </div>
  );
};

export default App;
