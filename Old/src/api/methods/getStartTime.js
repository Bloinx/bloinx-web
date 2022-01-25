const getStartTime = (methods) =>
  new Promise((resolve) => {
    methods
      .startTime()
      .call()
      .then((startTime) => {
        resolve(startTime);
      });
  });

export default getStartTime;
