const oneRoundReusable = artifacts.require("./oneRoundReusable.sol");

contract("oneRoundReusable", accounts => {
  it("...should add user to the first spot", async () => {
    const oneRoundReusableInstance = await oneRoundReusable.deployed(10,10,3);

    //register account 0 as user 1
    await oneRoundReusableInstance.registerUser(1,{ from: accounts[0], value: web3.utils.toWei('1', 'ether')});

    // Get stored value
    const storedData = await oneRoundReusable.addressOrderList(0).call();

    assert.equal(storedData, accounts[0], "The user was not added to the list");
  });
});
