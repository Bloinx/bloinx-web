const OneRoundReusable = artifacts.require("./oneRoundReusable.sol");

contract('OneRoundReusable', (accounts) => {
  let contract;

  before(async () => {
    contract = await OneRoundReusable.deployed();
  });

  describe('deployment', () => {
    it('contract deploy successfully', async () => {
      const address = contract.address

      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  // describe('users functions', () => {
  //   it('register user', async () => {

  //   })
  // })
  
  
})