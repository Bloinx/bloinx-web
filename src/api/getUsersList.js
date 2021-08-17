const getAvailablePlaces = (methods) =>
  new Promise((resolve) => {
    methods
      .groupSize()
      .call()
      .then((times) => {
        const tempUserList = [];
        const listLatePays = [];

        for (let index = 0; index < times; index += 1) {
          tempUserList.push(methods.addressOrderList(index));
          listLatePays.push(methods.latePaymentsList(index));
        }

        Promise.all(
          tempUserList.map(async (userBatch, userIndex) => {
            let user;
            try {
              const address = await userBatch.call();
              const latePayments = await listLatePays[userIndex].call();
              user = {
                userIndex,
                position: userIndex + 1,
                address,
                latePayments,
              };
            } catch (err) {
              user = {
                userIndex,
                position: userIndex + 1,
                address: null,
                latePayments: null,
              };
            }
            return user;
          })
        ).then((users) => {
          resolve({ totalUsers: times, users });
        });
      });
  });

export default getAvailablePlaces;
