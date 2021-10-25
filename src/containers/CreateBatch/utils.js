/* eslint-disable import/prefer-default-export */

export const getOptions = (participants) => {
  const options = [];
  for (let index = 1; index <= participants; index += 1) {
    options.push({ label: index, value: index });
  }
  return options;
};
