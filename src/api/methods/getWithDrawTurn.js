const getWithdrawTurn = (methods) =>
  new Promise((resolve, reject) => {
    methods
      .withdrawTurn()
      .call()
      .then((withdrawTurn) => {
        resolve(withdrawTurn);
      })
      .catch((err) => {
        reject(err);
      });
  });

export default getWithdrawTurn;
