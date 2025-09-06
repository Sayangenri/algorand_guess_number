import algosdk from "algosdk";
import { PeraWalletConnect } from "@perawallet/connect";

export const peraWallet = new PeraWalletConnect();

export const ADMIN_ADDRESS =
  "DTZOE4ZD77SOS3MET2Y7A3E37ZVW3SH5LW4GLAOCEXP2IEVKCW4C7XQ7GQ";

export const ADMIN_MNEMONIC =
  "joy glass dress escape coin trouble hub estate wet hover record neither sunset scrub polar bulb twelve flame depend panda used parrot artist about radar";

export const algod = new algosdk.Algodv2(
  "",
  "https://testnet-api.algonode.cloud",
  ""
);
