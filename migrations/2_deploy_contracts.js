const oneRoundReusable = artifacts.require("./oneRoundReusable.sol");
const Factory = artifacts.require("./main.sol");

module.exports = function(deployer, _network, [addressAdmin, _]) {
  deployer.deploy(oneRoundReusable, 10, 10, 2, addressAdmin)
    .then(() => deployer.deploy(Factory, oneRoundReusable.address))
    .catch((err) => console.log('Error: ', err));
};
