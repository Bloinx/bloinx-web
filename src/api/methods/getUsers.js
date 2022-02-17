/* eslint-disable no-unused-vars */
const getUsers = (methods, contract) =>
  new Promise((resolve) => {
    methods
      .getUserAvailableSavings()
      .call()
      .then((users) => {
        console.log(users);
        resolve(users);
      });
  });

export default getUsers;
