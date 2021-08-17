const getRoundsPeriods = (methods) =>
  new Promise((resolve) => {
    Promise.all([
      methods.groupSize().call(),
      methods.payTime().call(),
      methods.startTime().call(),
    ]).then((responces) => {
      const groupSize = Number(responces[0]);
      const payTime = Number(responces[1]);

      const startTime =
        responces[2] !== "0"
          ? new Date(responces[2] * 1000).toLocaleString()
          : null;
      const dateRounds = [];

      for (let indexTurn = 0; indexTurn < groupSize; indexTurn += 1) {
        const nextDate = Number(responces[2]) + payTime * indexTurn;
        const round = indexTurn + 1;

        if (indexTurn === 0) {
          dateRounds.push({
            round,
            startDate: startTime,
            endDate: new Date(
              (Number(responces[2]) + payTime - 1) * 1000
            ).toLocaleString(),
          });
        } else {
          dateRounds.push({
            round,
            startDate: new Date(nextDate * 1000).toLocaleString(),
            endDate: new Date((nextDate + payTime - 1) * 1000).toLocaleString(),
          });
        }
      }

      resolve(dateRounds);
    });
  });

export default getRoundsPeriods;
