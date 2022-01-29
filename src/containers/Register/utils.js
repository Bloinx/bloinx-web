import { configMin, MIM_TOKEN_FUJI_TEST_NET } from "../../config.main.web3";
import config from "../../config.sg.web3";
import supabase from "../../supabase";

import getAvailablePlaces from "../../utils/getAvailablePlaces";
import getCashIn from "../../utils/getCashIn";
import getFeeCost from "../../utils/getFeeCost";

export const getRegisterDetail = async (roundID) => {
  const { data, error } = await supabase
    .from("rounds")
    .select()
    .eq("id", roundID);

  if (error) {
    return error;
  }

  try {
    const { methods } = config(data[0].contract);
    const positionsAvailable = await getAvailablePlaces(methods);
    const cashIn = await getCashIn(methods);
    const feeCost = await getFeeCost(methods);

    return {
      ...data[0],
      positionsAvailable,
      cashIn: (Number(cashIn) * 10 ** -18).toFixed(2),
      feeCost: (Number(feeCost) * 10 ** -18).toFixed(2),
    };
  } catch (err) {
    return err;
  }
};

export const setRegisterUserStable = async ({ contract }) => {
  return new Promise((resolve, reject) => {
    const mim = configMin();
    mim.methods
      .approve(
        contract,
        "115792089237316195423570985008687907853269984665640564039457584007913129639935"
      )
      .send({
        from: localStorage.getItem("currentWallet"),
        to: MIM_TOKEN_FUJI_TEST_NET,
      })
      .once("receipt", async (receipt) => {
        resolve(receipt);
      })
      .on("error", async (err) => {
        reject(err);
      });
  });
};

export const setRegisterUser = async (props) => {
  const { form, roundData, approvalData } = props;
  const { methods } = config(roundData.contract);

  const currentWallet = localStorage.getItem("currentWallet");

  return new Promise((resolve, reject) =>
    methods
      .registerUser(form.position)
      .send({
        from: currentWallet,
        to: roundData.contract,
      })
      .once("receipt", async (recpt) => {
        console.log(recpt);

        const user = supabase.auth.user();
        const { data, error } = await supabase.from("positions").insert([
          {
            name: form.name,
            motive: form.motive,
            position: form.position,
            approve: form.approve,
            walletRegistered: currentWallet,
            userId: user.id,
          },
        ]);

        resolve(recpt);
      })
      .on("error", async (error) => {
        reject(error);
      })
  );
};
