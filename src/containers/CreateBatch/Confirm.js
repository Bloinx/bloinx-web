/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import InputTextField from "../../components/InputTextField";
import InputSelect from "../../components/InputSelect";
import InputTurnSelect from "../../components/InputTurnSelect";
import ButtonOnlyOneStep from "../../components/ButtonOnlyOneStep";

import styles from "./Confirm.module.scss";
import { confirmValidation } from "./validations";
import { motivationOptions } from "./constants";
import { getOptions } from "./utils";

function Confirm({ form, setForm }) {
  const history = useHistory();

  const handlerOnSubmit = (values) => {
    setForm({
      ...form,
      ...values,
    });
    history.push("/create-round/receipt");
  };

  return (
    <>
      <PageHeader title={<FormattedMessage id="createRound.titleConfirm" />} />
      <Formik
        initialValues={{
          name: form.name,
          motivation: form.motivation,
          turnSelected: form.turnSelected,
        }}
        validate={confirmValidation}
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
              <div className={styles.ConfirmCard}>
                <InputTextField
                  label={<FormattedMessage id="createRound.form.label.name" />}
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </div>
              <div className={styles.ConfirmCard}>
                <InputSelect
                  label={
                    <FormattedMessage id="createRound.form.label.motivation" />
                  }
                  name="motivation"
                  value={values.motivation}
                  onChange={handleChange}
                  options={motivationOptions}
                  error={errors.motivation}
                />
              </div>
              <div className={styles.ConfirmCard}>
                <InputTurnSelect
                  label={<FormattedMessage id="createRound.form.label.turn" />}
                  name="turnSelected"
                  value={values.turnSelected}
                  onChange={handleChange}
                  options={getOptions(form.participants)}
                  error={errors.turnSelected}
                />
              </div>
              <ButtonOnlyOneStep
                label={
                  <FormattedMessage id="createRound.actions.createRound" />
                }
                disabled={!values.name || !isValid}
                type="submit"
              />
            </form>
          );
        }}
      </Formik>
    </>
  );
}

Confirm.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default React.memo(Confirm);
