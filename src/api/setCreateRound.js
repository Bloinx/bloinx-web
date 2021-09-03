import firebase from "./config.firebase";
import config from "./config.web3";

const setCreateRound = ({
  name,
  warranty = 1,
  saving = 1,
  size = 3,
  paymentTime = 518400,
  withdrawalTime = 86400,
  isPublic = false,
}) => {
  const { uid } = firebase.auth().currentUser;
  const a = config();
  a.methods
    .createRound(warranty, saving, size, paymentTime, withdrawalTime)
    .send({
      from: "0xCfbc744B87Aac00Ec2Faf5D08bBA52E70835B484",
      to: "0x3D7D023400cAF0Ad5f77162A4F201AeF9d334dE6", // Factory
    })
    .once("receipt", async (receipt) => {
      const contract = receipt?.events?.RoundCreated?.returnValues?.childRound;
      const admin = receipt.from;
      const folio = receipt.transactionHash;
      firebase
        .database()
        .ref(`rounds/${contract}`)
        .set({
          firebase_user: uid,
          create_by: admin,
          blockchain_address: contract,
          folio,
          name,
          warranty,
          saving,
          size,
          paymentTime,
          withdrawalTime,
          roundDuration: paymentTime + withdrawalTime,
          isPublic,
          stage: 0,
        });
      console.log("ok");
    })
    .on("error", async (error) => {
      console.log(error);
    });
};

export default setCreateRound;
