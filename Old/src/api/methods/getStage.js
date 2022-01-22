import { stages } from "../constants";

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
