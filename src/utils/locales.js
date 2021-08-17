const flattenMessages = (nestedMessages, prefix = "") => {
  if (nestedMessages === null) {
    return {};
  }
  return Object.keys(nestedMessages).reduce((mssg, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "string") {
      Object.assign(mssg, { [prefixedKey]: value });
    } else {
      Object.assign(mssg, flattenMessages(value, prefixedKey));
    }

    return mssg;
  }, {});
};

export default flattenMessages;
