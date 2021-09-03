import { SAVE_USER_DATA } from "./types";

const initialState = {
  user: null,
  credential: null,
  additionalUserInfo: null,
};

export default function main(state = initialState, action) {
  switch (action.type) {
    case SAVE_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
