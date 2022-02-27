import supabase from "../../supabase";
import config from "../../config.sg.web3";

import getAdmin from "../../utils/getAdmin";
import getAddressOrderList from "../../utils/getAddressOrderList";

export const getRoundsList = async () => {
  const user = supabase.auth.user();

  const { data, error } = await supabase
    .from("rounds")
    .select("*, positions(name, registrationDate)")
    .eq("createByUser", user.id)
    .order("createTime", { ascending: true });

  console.log({ data, error });

  return new Promise((resolve, reject) => {
    let dataProcessed = [];
    let count = data.length - 1;

    if (error) {
      reject(error);
    }

    data.forEach(async (round) => {
      const { methods } = config(round.contract);

      const admin = await getAdmin(methods);
      const orderList = await getAddressOrderList(methods);

      const isAdmin = admin === localStorage.getItem("currentWallet");
      const isRegistered = !!orderList.find(
        ({ address }) =>
          address.toLowerCase() ===
          localStorage.getItem("currentWallet").toLowerCase()
      );

      dataProcessed = [...dataProcessed, { ...round, isRegistered, isAdmin }];

      if (count === 0) {
        resolve(dataProcessed);
      } else {
        count = count - 1;
      }
    });
  });
};
