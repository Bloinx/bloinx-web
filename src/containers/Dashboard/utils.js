import supabase from "../../supabase";
import config from "../../config.sg.web3";

import getAdmin from "../../utils/getAdmin";
import getAddressOrderList from "../../utils/getAddressOrderList";

export const getRoundsList = async () => {
  const user = supabase.auth.user();

  const { data, error } = await supabase
    .from("rounds")
    .select()
    .eq("createByUser", user.id);

  return new Promise((resolve, reject) => {
    let dataProcessed = [];
    let count = data.length - 1;

    if (error) {
      reject(error);
    }

    data.forEach(async (round) => {
      const { methods } = config(round.contract);

      const orderList = await getAddressOrderList(methods);
      const admin = await getAdmin(methods);

      const isRegistered = !!orderList.find(
        ({ address }) => address === localStorage.getItem("currentWallet")
      );
      const isAdmin = admin === localStorage.getItem("currentWallet");

      dataProcessed = [...dataProcessed, { ...round, isRegistered, isAdmin }];

      if (count === 0) {
        resolve(dataProcessed);
      } else {
        count = count - 1;
      }
    });
  });
};
