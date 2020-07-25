var Groups = artifacts.require("./Groups.sol");

module.exports = function(deployer) {
  deployer.deploy(Groups, 1, 1, 1);
};
