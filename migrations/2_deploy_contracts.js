var Groups = artifacts.require("./Groups.sol");

module.exports = function(deployer) {
  deployer.deploy(Groups, 1e15, 1e15, 2);
};
