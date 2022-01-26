const ON_REGISTER_STAGE = "ON_REGISTER_STAGE";
const ON_ROUND_ACTIVE = "ON_ROUND_ACTIVE";
const ON_ROUND_FINISHED = "ON_ROUND_FINISHED";

export const stages = {
  0: ON_REGISTER_STAGE,
  1: ON_ROUND_ACTIVE,
  2: ON_ROUND_FINISHED,
};

const getStage = (methods) =>
  new Promise((resolve) => {
    methods
      .stage()
      .call()
      .then((stage) => {
        resolve(stages[stage]);
      });
  });

export default getStage;
