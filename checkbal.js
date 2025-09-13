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


const irys = await getIrysUploader();

// Get loaded balance in atomic units
const atomicBalance = await irys.getBalance();
console.log(`Node balance (atomic units) = ${atomicBalance}`);

// Convert balance to standard
const convertedBalance = irys.utils.fromAtomic(atomicBalance);
console.log(`Node balance (converted) = ${convertedBalance}`);
