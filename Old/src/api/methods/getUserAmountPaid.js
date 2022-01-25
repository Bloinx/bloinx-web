const getUserAmountPaid = (methods, position) =>
  new Promise((resolve) => {
    methods
      .getUserAmountPaid(position)
      .call()
      .then((userAmountPaid) => {
        resolve(userAmountPaid);
      });
  });

export default getUserAmountPaid;
