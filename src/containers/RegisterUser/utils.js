/* eslint-disable import/prefer-default-export */

export const getOptions = (positionsAvailable = []) => {
  const options = positionsAvailable.map((position) => ({
    label: position.position,
    value: position.position,
  }));
  return options;
};
