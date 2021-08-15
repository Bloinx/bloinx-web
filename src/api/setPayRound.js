import { getWeb3 } from '../utils/web3';

const api = (methods, payload) => new Promise((resolve) => {
  methods
    .payTurn()
    .send({
      from: payload.currentAddress,
      value: getWeb3().utils.toWei('1', 'ether'),
    })
    .once('receipt', async (receipt) => {
      resolve({ status: 'success', receipt });
    })
    .on('error', async (error) => {
      resolve({ status: 'error', error });
    });
});

export default api;
