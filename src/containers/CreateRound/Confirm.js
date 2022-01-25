import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PageHeader from "../../components/PageHeader";
import ButtonOnlyOneStep from "../../components/ButtonOnlyOneStep";
import Loader from "../../components/Loader";

import styles from "./Receipt.module.scss";
import { DAY, WEEKLY, BIWEEKLY, MONTHLY } from "./constants";
import setCreateRound from "./utils";

const Confirm = ({ formData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const periodicityOptions = {
    [DAY]: "createRound.form.label.periodicityOptions.day",
    [WEEKLY]: "createRound.form.label.periodicityOptions.weekly",
    [BIWEEKLY]: "createRound.form.label.periodicityOptions.biweekly",
    [MONTHLY]: "createRound.form.label.periodicityOptions.monthly",
  };

  const paymentTime = {
    [DAY]: 1,
    [WEEKLY]: 7,
    [BIWEEKLY]: 14,
    [MONTHLY]: 30,
  };

  const handlerOnSubmit = () => {
    const currentWallet = localStorage.getItem("currentWallet");
    if (currentWallet) {
      setLoading(true);
      setCreateRound({
        warranty: formData.amount,
        saving: formData.amount,
        groupSize: formData.participants,
        payTime: paymentTime[formData.periodicity],
        isPublic: false,
        walletAddress: currentWallet,
      })
        .then(() => {
          setLoading(false);
          navigate("/create-round/status/success");
        })
        .catch((err) => {
          setLoading(false);
          navigate("/create-round/status/error");
        });
    }
  };

  return (
    <>
      <PageHeader title={t("createRound.title")} />
      {loading && <Loader />}
      {!loading && (
        <>
          <div className={styles.ReceiptCard}>
            <div className={styles.ReceiptCardItem}>
              <div>{t("createRound.form.label.participants")}</div>
              <div>{formData.participants}</div>
            </div>
            <div className={styles.ReceiptCardItem}>
              <div>{t("createRound.labels.amount")}</div>
              <div>{`${formData.amount} cUSD`}</div>
            </div>
            <div className={styles.ReceiptCardItem}>
              <div>{t("createRound.labels.receiptAmount")}</div>
              <div>{`${
                formData.amount * (formData.participants - 1)
              } cUSD`}</div>
            </div>
            <div className={styles.ReceiptCardItem}>
              <div>{t("createRound.labels.roundTime")}</div>
              <div>{t(periodicityOptions[formData.periodicity])}</div>
            </div>
          </div>

          <ButtonOnlyOneStep
            loading={loading}
            label={t("createRound.actions.payGuarantee")}
            onClick={handlerOnSubmit}
          />
        </>
      )}
    </>
  );
};

Confirm.propTypes = {
  formData: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(Confirm);
