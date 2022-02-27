const getCashIn = (methods) =>
  new Promise((resolve) => {
    methods
      .admin()
      .call()
      .then((admin) => {
        resolve(admin.toUpperCase());
      });
  });

export default getCashIn;
