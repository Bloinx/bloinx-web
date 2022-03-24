const getCashIn = (methods) => {
  return new Promise((resolve) => {
    methods
      .admin()
      .call()
      .then((admin) => {
        resolve(admin);
      });
  });
};

export default getCashIn;
