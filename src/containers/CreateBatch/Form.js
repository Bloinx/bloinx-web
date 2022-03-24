/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import PageHeader from "../../components/PageHeader";
import InputSlider from "../../components/InputSlider";
import InputOptionSelect from "../../components/InputOptionSelect";
import ButtonOnlyOneStep from "../../components/ButtonOnlyOneStep";

import styles from "./index.module.scss";
import { periodicityOptions, participantsOptions } from "./constants";
import { confirmForm } from "./validations";

const Form = ({ form, setForm }) => {
  const history = useHistory();

  const handlerOnSubmit = (values) => {
    setForm({
      ...form,
      ...values,
    });
    history.push("/create-round/confirm");
  };

  return (
    <>
      <PageHeader title={<FormattedMessage id="createRound.title" />} />
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
          const {
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isValid,
            isSubmitting,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <InputOptionSelect
                label={
                  <FormattedMessage id="createRound.form.label.participants" />
                }
                name="participants"
                value={values.participants}
                onChange={handleChange}
                options={participantsOptions}
                error={errors.participants}
              />

              <InputSlider
                label={<FormattedMessage id="createRound.form.label.amount" />}
                name="amount"
                value={values.amount}
                onChange={handleChange}
                min={1}
                max={20}
                step={1}
                error={errors.amount}
              />

              <div className={styles.CreateRound}>
                <div>
                  <div className={styles.CreateRoundTitle}>
                    <FormattedMessage id="createRound.labels.payPerRound" />
                  </div>
                  <div className={styles.CreateRoundAmount}>
                    {`${values.amount} cUSD`}
                  </div>
                </div>
                <div>
                  <div className={styles.CreateRoundTitle}>
                    <FormattedMessage id="createRound.labels.rewards" />
                  </div>
                  <div className={styles.CreateRoundAmount}>
                    {`${values.amount * (values.participants - 1)} cUSD`}
                  </div>
                </div>
              </div>

              <InputOptionSelect
                label={
                  <FormattedMessage id="createRound.form.label.periodicity" />
                }
                name="periodicity"
                value={values.periodicity}
                onChange={handleChange}
                options={periodicityOptions}
              />

              <ButtonOnlyOneStep disabled={!isValid} type="submit" />
            </form>
          );
        }}
      </Formik>
    </>
  );
};

Form.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  setForm: PropTypes.func.isRequired,
};

export default Form;
