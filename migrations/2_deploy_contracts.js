var Groups = artifacts.require("./Groups.sol");

module.exports = function(deployer) {
  deployer.deploy(Groups, 0002, 0, 3);
};
