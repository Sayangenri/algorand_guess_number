import algosdk from "algosdk";
import { ADMIN_MNEMONIC, algod } from "./config";

// admin → user
export const sendReward = async (receiver: string): Promise<string> => {
  const admin = algosdk.mnemonicToSecretKey(ADMIN_MNEMONIC);
  const suggestedParams = await algod.getTransactionParams().do();

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: admin.addr,
    receiver,
    amount: 200000, // 0.2 Algo
    note: new TextEncoder().encode("Congrats, you guessed right!"),
    suggestedParams,
  });

  const signedTxn = txn.signTxn(admin.sk);
  const txId = txn.txID().toString();

  await algod.sendRawTransaction(signedTxn).do();
  await algosdk.waitForConfirmation(algod, txId, 10);

  return txId;
};
