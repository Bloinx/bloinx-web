const setWithdrawTurn = (methods) =>
  new Promise((resolve) => {
    methods
      .withdrawTurn()
      .call()
      .then((data) => {
        resolve(data);
      });
  });

export default setWithdrawTurn;
