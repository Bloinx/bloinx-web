export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function formatAddress(originalAddress) {
  if (!originalAddress) {
    return "";
  }

  const firstPart = `${originalAddress.substring(0, 2)}${originalAddress
    .substring(2, 6)
    .toUpperCase()}`;
  const secondPart = `${originalAddress
    .substring(originalAddress.length - 4, originalAddress.length)
    .toUpperCase()}`;
  return `${firstPart}...${secondPart}`;
}

export default {
  validateEmail,
  formatAddress,
};
