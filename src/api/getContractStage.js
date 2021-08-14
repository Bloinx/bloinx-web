import { stages } from './constants';

const getAvailablePlaces = (methods) => new Promise((resolve) => {
  methods.stage().call().then((stage) => {
    resolve({ roundStage: stages[stage] });
  });
});

export default getAvailablePlaces;
