/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import InputSlider from "../../components/InputSlider";
import InputOptionSelect from "../../components/InputOptionSelect";
import ButtonOnlyOneStep from "../../components/ButtonOnlyOneStep";

import styles from "./index.module.scss";
import {
  participantsOptions,
  DAY,
  WEEKLY,
  BIWEEKLY,
  MONTHLY,
} from "./constants";
import { confirmForm } from "./validations";

const Form = ({ form, setForm }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlerOnSubmit = (values) => {
    setForm({
      ...form,
      ...values,
    });
    navigate("/create-round/confirm");
  };

  return (
    <Formik
      initialValues={{
        participants: form.participants,
        amount: form.amount,
        periodicity: form.periodicity,
      }}
      validate={confirmForm}
      onSubmit={handlerOnSubmit}
    >
      {(props) => {
        const { values, errors, handleChange, handleSubmit, isValid } = props;
        return (
          <form onSubmit={handleSubmit}>
            <InputOptionSelect
              label={t("createRound.form.label.participants")}
              name="participants"
              value={values.participants}
              onChange={handleChange}
              options={participantsOptions}
              error={errors.participants}
            />

            <InputSlider
              label={t("createRound.form.label.amount")}
              name="amount"
              value={values.amount}
              onChange={handleChange}
              min={1}
              max={10}
              step={1}
              error={errors.amount}
            />

            <div className={styles.CreateRound}>
              <div>
                <div className={styles.CreateRoundTitle}>
                  {t("createRound.labels.payPerRound")}
                </div>
                <div className={styles.CreateRoundAmount}>
                  {`${values.amount} cUSD`}
                </div>
              </div>
              <div>
                <div className={styles.CreateRoundTitle}>
                  {t("createRound.labels.rewards")}
                </div>
                <div className={styles.CreateRoundAmount}>
                  {`${values.amount * (values.participants - 1)} cUSD`}
                </div>
              </div>
            </div>

            <InputOptionSelect
              label={t("createRound.form.label.periodicity")}
              name="periodicity"
              value={values.periodicity}
              onChange={handleChange}
              options={[
                {
                  label: t("createRound.form.label.periodicityOptions.day"),
                  value: DAY,
                },
                {
                  label: t("createRound.form.label.periodicityOptions.weekly"),
                  value: WEEKLY,
                },
                {
                  label: t(
                    "createRound.form.label.periodicityOptions.biweekly"
                  ),
                  value: BIWEEKLY,
                },
                {
                  label: t("createRound.form.label.periodicityOptions.monthly"),
                  value: MONTHLY,
                },
              ]}
            />

            <ButtonOnlyOneStep disabled={!isValid} type="submit" />
          </form>
        );
      }}
    </Formik>
  );
};

Form.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  setForm: PropTypes.func.isRequired,
};

export default Form;
