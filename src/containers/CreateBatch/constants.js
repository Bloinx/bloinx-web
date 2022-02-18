/* eslint-disable import/prefer-default-export */
import React from "react";
import { FormattedMessage } from "react-intl";

const DAY = "day";
const WEEKLY = "weekly";
const BIWEEKLY = "biweekly";

export const INITIAL_FORM_VALUES = {
  name: null,
  participants: 3,
  amount: 1,
  periodicity: "biweekly",
  isComplete: false,
};

export const paymentTime = {
  [DAY]: 1,
  [WEEKLY]: 7,
  [BIWEEKLY]: 14,
};

export const periodicityOptions = [
  {
    label: (
      <FormattedMessage id="createRound.form.label.periodicityOptions.day" />
    ),
    value: DAY,
  },
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
];
