/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { Modal } from "antd";

import PageHeader from "../../components/PageHeader";
import ButtonOnlyOneStep from "../../components/ButtonOnlyOneStep";
import Loader from "../../components/Loader";

import APISetCreateRound from "../../api/setCreateRound";

import styles from "./Receipt.module.scss";
import {
  INITIAL_FORM_VALUES,
  periodicityOptions,
  paymentTime,
} from "./constants";

const Receipt = ({ form, setForm, walletAddress }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handlerOnSubmit = (values) =>
    setForm({
      ...form,
      ...values,
      isComplete: true,
    });

  useEffect(() => {
    if (form.isComplete && !walletAddress) {
      console.log(1);
      Modal.warning({
        title: "Wallet no encontrada",
        content: "Por favor conecta tu wallet antes de continuar.",
      });
      setForm({
        ...form,
        isComplete: false,
      });
    }
    if (form.isComplete && walletAddress) {
      setLoading(true);
      APISetCreateRound({
        name: form.name,
        warranty: form.amount,
        saving: form.amount,
        groupSize: form.participants,
        payTime: paymentTime[form.periodicity],
        isPublic: false,
        walletAddress,
      })
        .then(() => {
          setLoading(false);
          setForm(INITIAL_FORM_VALUES);
          history.push("/create-round/receipt/success");
        })
        .catch((err) => {
          setForm({
            ...form,
            isComplete: false,
          });
          setLoading(false);
          history.push("/create-round/receipt/error");
        });
    }
  }, [form.isComplete]);

  return (
    <>
      <PageHeader title={<FormattedMessage id="createRound.title" />} />
      {loading && <Loader />}
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

          <ButtonOnlyOneStep
            loading={loading}
            label={<FormattedMessage id="createRound.actions.payGuarantee" />}
            // disabled={!values.termsAndConditions || !isValid}
            type="submit"
            onClick={handlerOnSubmit}
          />
        </>
      )}
    </>
  );
};

Receipt.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  setForm: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const walletAddress = state?.main?.currentAddress;
  return { walletAddress };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Receipt);
