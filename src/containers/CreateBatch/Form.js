/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import PageHeader from "../../components/PageHeader";
import InputSlider from "../../components/InputSlider";
import InputOptionSelect from "../../components/InputOptionSelect";
import ButtonOnlyOneStep from "../../components/ButtonOnlyOneStep";

import styles from "./index.module.scss";

const Form = ({ form, onChangeValue }) => {
  const history = useHistory();

  const goTo = () => history.push("/create-round/confirm");
  return (
    <>
      <PageHeader title={<FormattedMessage id="createRound.title" />} />
      <InputOptionSelect
        label={<FormattedMessage id="createRound.form.label.participants" />}
        value={form.participants}
        onChange={onChangeValue}
        options={[
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
        ]}
        name="participants"
      />
      <InputSlider
        min={100}
        max={500}
        label={<FormattedMessage id="createRound.form.label.amount" />}
        value={form.amount}
        onChange={onChangeValue}
        name="amount"
      />
      <div className={styles.CreateRound}>
        <div>
          <div className={styles.CreateRoundTitle}>
            <FormattedMessage id="createRound.labels.payPerRound" />
          </div>
          <div className={styles.CreateRoundAmount}>{form.amount}</div>
        </div>
        <div>
          <div className={styles.CreateRoundTitle}>
            <FormattedMessage id="createRound.labels.rewards" />
          </div>
          <div className={styles.CreateRoundAmount}>
            {form.amount * form.participants}
          </div>
        </div>
      </div>
      <InputOptionSelect
        label={<FormattedMessage id="createRound.form.label.periodicity" />}
        value={form.periodicity}
        onChange={onChangeValue}
        options={[
          {
            label: (
              <FormattedMessage id="createRound.form.label.periodicityOptions.weekly" />
            ),
            value: "weekly",
          },
          {
            label: (
              <FormattedMessage id="createRound.form.label.periodicityOptions.biweekly" />
            ),
            value: "biweekly",
          },
          {
            label: (
              <FormattedMessage id="createRound.form.label.periodicityOptions.monthly" />
            ),
            value: "monthly",
          },
        ]}
        name="periodicity"
      />
      <ButtonOnlyOneStep onClick={goTo} />
    </>
  );
};

Form.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default Form;
