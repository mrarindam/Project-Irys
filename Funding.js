import { Uploader } from "@irys/upload";
import { Ethereum } from "@irys/upload-ethereum";
import "dotenv/config";

const getIrysUploader = async () => {

  const rpcURL = "https://ethereum-sepolia-rpc.publicnode.com";

  const irysUploader = await Uploader(Ethereum)
    .withWallet(process.env.PRIVATE_KEY) 
    .withRpc(rpcURL)
    .devnet();

  return irysUploader;
};

const upfrontFund = async () => {
  try {
    const irys = await getIrysUploader();


    const amount = irys.utils.toAtomic(0.01);


    const fundTx = await irys.fund(amount, 1.2);

    console.log("✅ Successfully funded!");
    console.log("Tx ID:", fundTx.id);
    console.log("Quantity:", irys.utils.fromAtomic(fundTx.quantity), irys.token);
    console.log("Reward (fee):", irys.utils.fromAtomic(fundTx.reward), irys.token);
    console.log("Target (Bundler Address):", fundTx.target);


    const reEval = await irys.funder.submitFundTransaction(fundTx.id);
    console.log("Re-evaluated fundTx:", reEval);
  } catch (e) {
    console.error("❌ Error funding:", e);
  }
};

upfrontFund();
