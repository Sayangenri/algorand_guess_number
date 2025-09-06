import algosdk from "algosdk";
import { peraWallet, ADMIN_ADDRESS, algod } from "./config";

// user → admin
export const sendStake = async (account: string): Promise<string> => {
  const suggestedParams = await algod.getTransactionParams().do();

  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: account,
    receiver: ADMIN_ADDRESS,
    amount: 100000, // 0.1 Algo
    note: new TextEncoder().encode("Stake to play number guess"),
    suggestedParams,
  });

  const txnGroup = [{ txn, signers: [account] }];
  const signedTxns: Uint8Array[] = await peraWallet.signTransaction([txnGroup]);

  const txId = txn.txID().toString();
  await algod.sendRawTransaction(signedTxns[0]).do();
  await algosdk.waitForConfirmation(algod, txId, 10);

  return txId;
};
