/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { Modal } from "antd";

import PageHeader from "../../components/PageHeader";
import InputTextField from "../../components/InputTextField";
import InputSelect from "../../components/InputSelect";
import InputTurnSelect from "../../components/InputTurnSelect";
import ButtonOnlyOneStep from "../../components/ButtonOnlyOneStep";
import Loader from "../../components/Loader";

import APISetRegisterUser from "../../api/setRegisterUser";

import styles from "./Confirm.module.scss";
import { confirmValidation } from "./validations";
import { motivationOptions } from "./constants";
import { getOptions } from "./utils";

function Form({ form, setForm, roundData, walletAddress }) {
  const user = getAuth().currentUser;
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handlerOnSubmit = (values) => {
    if (!walletAddress) {
      Modal.warning({
        title: "Wallet no encontrada",
        content: "Por favor conecta tu wallet antes de continuar.",
      });
    } else {
      setLoading(true);
      APISetRegisterUser({
        userId: user.uid,
        walletAddress,
        roundId: roundData.roundId,
        name: values.name,
        motivation: values.motivation,
        position: values.turnSelected,
      })
        .then((receipt) => {
          console.log(receipt);
          history.push("/register-user/success");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          Modal.error({
            title: "Error al registrar",
            content:
              "No se pudimos registrarte en la tanda. Por favor intenta nuevamente.",
          });
        });
    }
  };

  return (
    <>
      <PageHeader title={<FormattedMessage id="createRound.titleConfirm" />} />
      {loading && <Loader />}
      {!loading && (
        <Formik
          initialValues={{
            name: form.name,
            motivation: form.motivation,
            turnSelected:
              form.turnSelected ||
              (roundData.positionsAvailable && roundData.positionsAvailable[0]
                ? roundData.positionsAvailable[0].position
                : 3),
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
                    label={
                      <FormattedMessage id="createRound.form.label.name" />
                    }
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
                    label={
                      <FormattedMessage id="createRound.form.label.turn" />
                    }
                    name="turnSelected"
                    value={values.turnSelected}
                    onChange={handleChange}
                    options={getOptions(roundData.positionsAvailable)}
                    error={errors.turnSelected}
                  />
                </div>
                <div className={styles.ConfirmCard}>
                  <PageHeader
                    title={<FormattedMessage id="payments.details.title" />}
                  />
                  <div className={styles.TextPaymentDetails}>
                    <FormattedMessage id="payments.details.subtitle" />
                  </div>
                  <div className={styles.PaymentDetails}>
                    <div>
                      <div className={styles.TextPaymentDetails}>
                        <FormattedMessage id="payments.details.securityDeposit" />
                      </div>
                      <div className={styles.TextPaymentDetails}>
                        {roundData.cashIn || "..."} cUSD
                      </div>
                    </div>
                    <div>
                      <div className={styles.TextPaymentDetails}>
                        <FormattedMessage id="payments.details.serviceFee" />
                      </div>
                      <div className={styles.TextPaymentDetails}>
                        {roundData.feeCost || "..."} cUSD
                      </div>
                    </div>
                  </div>
                </div>
                <ButtonOnlyOneStep
                  label={
                    <FormattedMessage id="createRound.actions.registerMe" />
                  }
                  disabled={!values.name || !isValid}
                  type="submit"
                />
              </form>
            );
          }}
        </Formik>
      )}
    </>
  );
}

Form.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default React.memo(Form);
