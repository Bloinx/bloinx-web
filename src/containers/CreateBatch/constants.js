/* eslint-disable import/prefer-default-export */
import React from "react";
import { FormattedMessage } from "react-intl";

const WEEKLY = "weekly";
const BIWEEKLY = "biweekly";
const MONTHLY = "monthly";

export const INITIAL_FORM_VALUES = {
  name: null,
  participants: 3,
  amount: 1,
  periodicity: "monthly",
  isComplete: false,
};

export const paymentTime = {
  [WEEKLY]: 7,
  [BIWEEKLY]: 14,
  [MONTHLY]: 30,
};

export const periodicityOptions = [
  {
    label: (
      <FormattedMessage id="createRound.form.label.periodicityOptions.weekly" />
    ),
    value: WEEKLY,
  },
  {
    label: (
      <FormattedMessage id="createRound.form.label.periodicityOptions.biweekly" />
    ),
    value: BIWEEKLY,
  },
  {
    label: (
      <FormattedMessage id="createRound.form.label.periodicityOptions.monthly" />
    ),
    value: MONTHLY,
  },
];

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
  {
    label: "11",
    value: 11,
  },
  {
    label: "12",
    value: 12,
  },
];
