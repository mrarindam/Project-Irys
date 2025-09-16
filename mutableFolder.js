import { Uploader } from "@irys/upload";
import { Ethereum } from "@irys/upload-ethereum";
import dotenv from "dotenv";
dotenv.config();

//Connect To Devnet
const getIrysUploader = async () => {
  const rpcURL = "https://ethereum-sepolia-rpc.publicnode.com"; 
  const irysUploader = await Uploader(Ethereum)
    .withWallet(process.env.PRIVATE_KEY)
    .withRpc(rpcURL)
    .devnet();

  return irysUploader;
};

const uploadFolderExample = async () => {
  try {
    const irysUploader = await getIrysUploader();

    const folderPath = "./images";

    console.log("📂 Uploading folder:", folderPath);

    // Upload full folder
    const receipt = await irysUploader.uploadFolder(folderPath);

    console.log("✅ Folder uploaded!");
    console.log(`Manifest ID: ${receipt.id}`);
    console.log(`Access example: https://gateway.irys.xyz/${receipt.id}/yourImage.png`);
  } catch (e) {
    console.error("❌ Upload error:", e);
  }
};

uploadFolderExample();
