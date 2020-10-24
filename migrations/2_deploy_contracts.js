var GroupsTime = artifacts.require("./GroupsTime.sol");

module.exports = function(deployer) {
  deployer.deploy(GroupsTime, 5, 5, 3);
};
