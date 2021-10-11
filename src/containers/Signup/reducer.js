import { SAVE_USER_DATA } from "./types";

const initialState = {
  uid: null,
  displayName: null,
  photoURL: null,
  email: null,
  emailVerified: null,
  phoneNumber: null,
};

export default function main(state = initialState, { type, payload }) {
  switch (type) {
    case SAVE_USER_DATA:
      return {
        ...state,
        uid: payload.uid,
        displayName: payload.displayName,
        photoURL: payload.photoURL,
        email: payload.email,
        emailVerified: payload.emailVerified,
        phoneNumber: payload.phoneNumber,
      };
    default:
      return state;
  }
}
