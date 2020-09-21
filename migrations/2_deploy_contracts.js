var GroupsTime = artifacts.require("./GroupsTime.sol");

module.exports = function(deployer) {
  deployer.deploy(GroupsTime, 1e15, 1e15, 2);
};
