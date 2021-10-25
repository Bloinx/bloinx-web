/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { CubeSpinner } from "react-spinners-kit";

import PageHeader from "../../components/PageHeader";
import InputCheck from "../../components/InputCheck";
import ButtonOnlyOneStep from "../../components/ButtonOnlyOneStep";

import APISetCreateRound from "../../api/setCreateRound";

import styles from "./Receipt.module.scss";
import { receiptValidation } from "./validations";
import {
  INITIAL_FORM_VALUES,
  periodicityOptions,
  paymentTime,
} from "./constants";

const Receipt = ({ form, setForm }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handlerOnSubmit = (values) =>
    setForm({
      ...form,
      ...values,
      isComplete: true,
    });

  useEffect(() => {
    if (form.isComplete) {
      setLoading(true);
      APISetCreateRound({
        name: form.name,
        warranty: form.amount,
        saving: form.amount,
        groupSize: form.participants,
        payTime: paymentTime[form.periodicity],
        isPublic: false,
      })
        .then(() => {
          setLoading(false);
          setForm(INITIAL_FORM_VALUES);
          history.push("/create-round/status");
        })
        .catch((err) => {
          setForm({
            ...form,
            isComplete: false,
          });
          setLoading(false);
          history.push("/create-round/status");
        });
    }
  }, [form.isComplete]);

  return (
    <>
      <PageHeader title={<FormattedMessage id="createRound.titleReceipt" />} />
      {loading && (
        <div className={styles.ReceiptCardLoader}>
          <CubeSpinner frontColor="#F58F98" size={30} />
          <p>
            <FormattedMessage id="createRound.titleReceipt" />
          </p>
        </div>
      )}
      {!loading && (
        <>
          <div className={styles.ReceiptCard}>
            <div className={styles.ReceiptCardItem}>
              <div>
                <FormattedMessage id="createRound.form.label.participants" />
              </div>
              <div>{form.participants}</div>
            </div>
            <div className={styles.ReceiptCardItem}>
              <div>
                <FormattedMessage id="createRound.labels.amount" />
              </div>
              <div>{form.amount}</div>
            </div>
            <div className={styles.ReceiptCardItem}>
              <div>
                <FormattedMessage id="createRound.labels.receiptAmount" />
              </div>
              <div>{form.amount * (form.participants - 1)}</div>
            </div>
            <div className={styles.ReceiptCardItem}>
              <div>
                <FormattedMessage id="createRound.labels.roundTime" />
              </div>
              <div>
                {
                  periodicityOptions.find(
                    (option) => option.value === form.periodicity
                  ).label
                }
              </div>
            </div>
          </div>

          <Formik
            initialValues={{
              termsAndConditions: form.termsAndConditions,
            }}
            validate={receiptValidation}
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
                  <div className={styles.ReceiptCard}>
                    <div className={styles.ReceiptCardTerms}>
                      <FormattedMessage id="createRound.labels.roundTime" />
                    </div>
                    <div>
                      <InputCheck
                        label={
                          <FormattedMessage id="createRound.labels.terms" />
                        }
                        name="termsAndConditions"
                        onChange={handleChange}
                        error={errors.name}
                        checked={values.termsAndConditions}
                      />
                    </div>
                  </div>

                  <ButtonOnlyOneStep
                    loading={loading}
                    label={
                      <FormattedMessage id="createRound.actions.payGuarantee" />
                    }
                    disabled={!values.termsAndConditions || !isValid}
                    type="submit"
                  />
                </form>
              );
            }}
          </Formik>
        </>
      )}
    </>
  );
};

Receipt.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  setForm: PropTypes.func.isRequired,
};

export default Receipt;
