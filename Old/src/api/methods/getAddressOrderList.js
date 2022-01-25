const getAddressOrderList = (methods) =>
  new Promise((resolve) => {
    methods
      .groupSize()
      .call()
      .then((times) => {
        const tempUserList = [];

        for (let index = 0; index < times; index += 1) {
          tempUserList.push(methods.addressOrderList(index));
        }

        Promise.all(
          tempUserList.map(async (userBatch, userIndex) => {
            let user;
            try {
              const address = await userBatch.call();
              user = {
                key: userIndex,
                position: userIndex + 1,
                address,
              };
            } catch (err) {
              user = {
                key: userIndex,
                position: userIndex + 1,
                address: null,
              };
            }
            return user;
          })
        ).then((users) => {
          resolve(users);
        });
      });
  });

export default getAddressOrderList;
