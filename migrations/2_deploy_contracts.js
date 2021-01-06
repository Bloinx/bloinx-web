var oneRoundReusable = artifacts.require("./oneRoundReusable.sol");

module.exports = function(deployer) {
  deployer.deploy(oneRoundReusable, 2, 2, 3);
};
