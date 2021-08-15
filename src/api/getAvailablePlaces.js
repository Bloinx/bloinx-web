import contracts from '../constants/contracts';

const getAvailablePlaces = (methods) => new Promise((resolve) => {
  methods.groupSize().call().then((times) => {
    const tempUserList = [];

    for (let index = 0; index < times; index += 1) {
      tempUserList.push(methods.addressOrderList(index));
    }

    Promise.all(
      tempUserList.map(async (userBatch, userIndex) => {
        let user;
        try {
          const address = await userBatch.call();
          if (address !== '0x0000000000000000000000000000000000000000') {
            user = {
              userIndex, position: userIndex + 1, status: 'NoAvailable', address,
            };
          } else {
            user = {
              userIndex, position: userIndex + 1, status: 'Available', address,
            };
          }
        } catch (err) {
          user = {
            userIndex, position: userIndex + 1, status: 'Error', address: null,
          };
        }
        return user;
      }),
    ).then((users) => {
      const availablePlaces = users.filter((userItem) => userItem.status !== 'NoAvailable' && userItem.status !== 'Error');
      resolve({ roundCapacity: times, availablePlaces, contract: contracts.savingGroups[43113] });
    });
  });
});

export default getAvailablePlaces;
