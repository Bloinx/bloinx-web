import APIGetUsersList from "./methods/getAddressOrderList";

const getRoundWithdrawPay = (methods, payload) =>
  new Promise((resolve) => {
    if (!payload) {
      resolve(null);
    } else {
      Promise.all([APIGetUsersList(methods)]).then((responses) => {
        const userSelected = responses[0].users.find(
          (user) => user.address.toLowerCase() === payload
        );
        if (userSelected && userSelected.position) {
          resolve(userSelected.position);
        } else {
          resolve("");
        }
      });
    }
  });

export default getRoundWithdrawPay;
