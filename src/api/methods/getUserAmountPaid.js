const getUserAmountPaid = (methods, position) =>
  new Promise((resolve) => {
    console.log("->>>>", position);
    methods
      .getUserAmountPaid("1")
      .call()
      .then((userAmountPaid) => {
        resolve(userAmountPaid);
      });
  });

export default getUserAmountPaid;
