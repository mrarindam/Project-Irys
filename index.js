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

//Fund To Account
const fundAccount = async () => {
	const irysUploader = await getIrysUploader();
	try {
		const fundTx = await irysUploader.fund(irysUploader.utils.toAtomic(0.0001));
		console.log(`Successfully funded ${irysUploader.utils.fromAtomic(fundTx.quantity)} ${irysUploader.token}`);
	} catch (e) {
		console.log("Error when funding ", e);
	}
};

//Upload Data
const uploadData = async () => {
	const irysUploader = await getIrysUploader();
	const dataToUpload = "hirys world.";
	try {
		const receipt = await irysUploader.upload(dataToUpload);
		console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
	} catch (e) {
		console.log("Error when uploading ", e);
	}
};

const uploadFile = async () => {
	const irysUploader = await getIrysUploader();
	// Your file
	const fileToUpload = "./MrxArinda.png";

	const tags = [{ name: "mrxarindam", value: "0" }];

	try {
		const receipt = await irysUploader.uploadFile(fileToUpload, { tags: tags });
		console.log(`File uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
	} catch (e) {
		console.log("Error when uploading ", e);
	}
};


// Run the script
(async () => {
//   await fundAccount();
  await uploadFile()
//   await uploadData();
})();

