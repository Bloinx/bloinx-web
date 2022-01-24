import supabase from "../../supabase";
import config, { MAIN_FACTORY_FUJI_TEST_NET } from "../../config.main.web3";

const setCreateRound = ({
  warranty,
  saving,
  groupSize,
  payTime,
  isPublic,
  walletAddress,
}) =>
  new Promise((resolve, reject) => {
    const m = config();

    m.methods
      .createRound(
        warranty,
        saving,
        groupSize,
        payTime,
        "0x874069fa1eb16d44d622f2e0ca25eea172369bc1"
      )
      .send({
        from: walletAddress,
        to: MAIN_FACTORY_FUJI_TEST_NET,
      })
      .once("receipt", async (receipt) => {
        const contract =
          receipt?.events?.RoundCreated?.returnValues?.childRound;
        const admin = receipt.from;
        const folio = receipt.transactionHash;

        const session = supabase.auth.session();
        const { data, error } = await supabase.from("round").insert([
          {
            createByUser: session.user.id,
            createByWallet: admin,
            contract,
            folio,
            isPublic,
          },
        ]);
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      })
      .on("error", async (error) => {
        reject(error);
      });
  });

export default setCreateRound;
