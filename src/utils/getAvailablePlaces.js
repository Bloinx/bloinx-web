const getAvailablePlaces = (methods) =>
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
              if (address !== "0x0000000000000000000000000000000000000000") {
                user = {
                  position: userIndex + 1,
                  available: false,
                  address,
                };
              } else {
                user = {
                  position: userIndex + 1,
                  available: true,
                  address,
                };
              }
            } catch (err) {
              user = {
                position: userIndex + 1,
                available: false,
                address: null,
              };
            }
            return user;
          })
        ).then((users) => {
          const availablePlaces = users.filter(
            (userItem) => userItem.available
          );
          resolve(availablePlaces);
        });
      });
  });

export default getAvailablePlaces;
