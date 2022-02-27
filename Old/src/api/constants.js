export const configurationOfDates = {
  formatMatcher: "basic",
};

export const reverseDateToOperation = (localDateString) => {
  const parts = localDateString.split(" ");
  return [parts[0].split("/").reverse().join("/"), parts[1]].join(" ");
};
