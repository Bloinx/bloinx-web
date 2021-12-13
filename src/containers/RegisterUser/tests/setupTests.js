const docData = { data: "MOCK_DATA" };
const docResult = {
  data: () => docData,
};
const get = jest.fn(() => Promise.resolve(docResult));
const set = jest.fn();
const doc = jest.fn(() => {
  return {
    set,
    get,
  };
});
const firestore = () => {
  return { doc };
};
firestore.FieldValue = {
  serverTimestamp: () => {
    return "MOCK_TIME";
  },
};

export { firestore };
