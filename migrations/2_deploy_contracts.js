var Groups = artifacts.require("./Groups.sol");

module.exports = function(deployer) {
  deployer.deploy(Groups, 050000, 0, 3);
};
