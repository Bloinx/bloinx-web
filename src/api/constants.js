export const ON_REGISTER_STAGE = "ON_REGISTER_STAGE";
export const ON_ROUND_ACTIVE = "ON_ROUND_ACTIVE";
export const ON_ROUND_FINISHED = "ON_ROUND_FINISHED";

export const stages = {
  0: ON_REGISTER_STAGE,
  1: ON_ROUND_ACTIVE,
  2: ON_ROUND_FINISHED,
};

export const configurationOfDates = {
  formatMatcher: "basic",
};

export const reverseDateToOperation = (localDateString) => {
  const parts = localDateString.split(" ");
  return [parts[0].split("/").reverse().join("/"), parts[1]].join(" ");
};
