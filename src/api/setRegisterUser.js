import { getWeb3 } from '../utils/web3';

const api = (methods, payload) => new Promise((resolve) => {
  console.log({ methods, payload });
  methods
    .registerUser(payload.turnSelected)
    .send({
      from: payload.currentAddress,
      value: getWeb3().utils.toWei('1', 'ether'),
    })
    .once('receipt', async (receipt) => {
      console.log('success', receipt);
      resolve({ status: 'success', receipt });
    })
    .on('error', async (error) => {
      console.log('Error: ', error);
      resolve({ status: 'error', error });
    });
});

export default api;
