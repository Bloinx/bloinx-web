/* eslint-disable import/prefer-default-export */
import React from "react";
import { FormattedMessage } from "react-intl";

const WEEKLY = "weekly";
const BIWEEKLY = "biweekly";
const MONTHLY = "monthly";

export const INITIAL_FORM_VALUES = {
  name: null,
  participants: 5,
  amount: 1,
  periodicity: "monthly",
  turnSelected: 1,
  motivation: "other",
  termsAndConditions: false,
  isComplete: false,
};

export const paymentTime = {
  [WEEKLY]: 1000 * 60 * 60 * 24 * 7,
  [BIWEEKLY]: 1000 * 60 * 60 * 24 * 14,
  [MONTHLY]: 1000 * 60 * 60 * 24 * 30,
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

export const motivationOptions = [
  { label: "Prestamo", value: "loan" },
  { label: "Vacaciones", value: "vacations" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Health ", value: "health " },
  { label: "Automovil", value: "car" },
  { label: "Hogar", value: "house" },
  { label: "Negocio", value: "business" },
  { label: "Regalos", value: "gifts" },
  { label: "Otro", value: "other" },
];
