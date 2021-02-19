var oneRoundReusable = artifacts.require("./oneRoundReusable.sol");

module.exports = function(deployer) {
  deployer.deploy(oneRoundReusable, 10, 10, 4);
};
