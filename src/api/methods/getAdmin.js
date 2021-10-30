const getCashIn = (methods) =>
  new Promise((resolve) => {
    methods
      .admin()
      .call()
      .then((admin) => {
        resolve(admin);
      });
  });

export default getCashIn;
