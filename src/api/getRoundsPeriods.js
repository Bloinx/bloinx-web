import { configurationOfDates } from "./constants";

const getRoundsPeriods = (methods) =>
  new Promise((resolve) => {
    Promise.all([
      methods.groupSize().call(),
      methods.payTime().call(),
      methods.startTime().call(),
      methods.withdrawTime().call(),
    ]).then((responses) => {
      const groupSize = Number(responses[0]);
      const payTime = Number(responses[1]);
      const toDraw = Number(responses[3]);

      const startTime = responses[2] !== "0" ? Number(responses[2]) : null;
      const dateRounds = [];

      for (let indexTurn = 0; indexTurn < groupSize; indexTurn += 1) {
        const nextDate = Number(responses[2]) + payTime * indexTurn;
        const round = indexTurn + 1;

        if (indexTurn === 0) {
          dateRounds.push({
            round,
            startDate: new Date(startTime * 1000).toLocaleString(
              undefined,
              configurationOfDates
            ),
            endDate: new Date(
              (Number(responses[2]) + payTime - 1) * 1000
            ).toLocaleString(undefined, configurationOfDates),
            startToDraw: new Date((startTime + toDraw) * 1000).toLocaleString(
              undefined,
              configurationOfDates
            ),
          });
        } else {
          dateRounds.push({
            round,
            startDate: new Date(nextDate * 1000).toLocaleString(
              undefined,
              configurationOfDates
            ),
            endDate: new Date((nextDate + payTime - 1) * 1000).toLocaleString(
              undefined,
              configurationOfDates
            ),
            startToDraw: new Date((nextDate + toDraw) * 1000).toLocaleString(
              undefined,
              configurationOfDates
            ),
          });
        }
      }

      resolve(dateRounds);
    });
  });

export default getRoundsPeriods;
