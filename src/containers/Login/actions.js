import { SAVE_USER_DATA } from "./types";

const saveUserAction = (userData) => ({
  type: SAVE_USER_DATA,
  payload: userData,
});

export default saveUserAction;
