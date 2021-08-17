const setWithdrawTurn = (methods) =>
  new Promise((resolve) => {
    methods
      .withdrawTurn()
      .call()
      .then((data) => {
        console.log(data);
        resolve(data);
      });
  });

export default setWithdrawTurn;
