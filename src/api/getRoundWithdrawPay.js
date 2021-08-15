/* eslint-disable no-unused-vars */
import APIGetUsersList from './getUsersList';

const getRoundWithdrawPay = (methods, payload) => new Promise((resolve, reject) => {
  if (!payload) {
    resolve(null);
  } else {
    Promise.all([
      APIGetUsersList(methods),
    ]).then((responses) => {
      const { position } = responses[0].users.find(
        (user) => (user.address).toLowerCase() === payload,
      );
      resolve(position);
    });
  }
});

export default getRoundWithdrawPay;
