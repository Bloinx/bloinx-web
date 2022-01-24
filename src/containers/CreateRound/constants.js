export const DAY = "day";
export const WEEKLY = "weekly";
export const BIWEEKLY = "biweekly";
export const MONTHLY = "monthly";

export const INITIAL_FORM_VALUES = {
  name: null,
  participants: 3,
  amount: 1,
  periodicity: "monthly",
};

export const paymentTime = {
  [DAY]: 1,
  [WEEKLY]: 7,
  [BIWEEKLY]: 14,
  [MONTHLY]: 30,
};

export const participantsOptions = [
  {
    label: "3",
    value: 3,
  },
  {
    label: "4",
    value: 4,
  },
  {
    label: "5",
    value: 5,
  },
  {
    label: "6",
    value: 6,
  },
  {
    label: "7",
    value: 7,
  },
  {
    label: "8",
    value: 8,
  },
  {
    label: "9",
    value: 9,
  },
  {
    label: "10",
    value: 10,
  },
];
