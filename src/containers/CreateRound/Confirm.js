import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PageHeader from "../../components/PageHeader";
import ButtonOnlyOneStep from "../../components/ButtonOnlyOneStep";
import Loader from "../../components/Loader";

// import setCreateRound from "./utils";

import styles from "./Receipt.module.scss";
import {
  INITIAL_FORM_VALUES,
  periodicityOptions,
  paymentTime,
} from "./constants";

const Confirm = ({ form, setForm, walletAddress }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlerOnSubmit = (values) =>
    setForm({
      ...form,
      ...values,
      isComplete: true,
    });

  useEffect(() => {
    if (form.isComplete && !walletAddress) {
      // Modal.warning({
      //   title: "Wallet no encontrada",
      //   content: "Por favor conecta tu wallet antes de continuar.",
      // });
      setForm({
        ...form,
        isComplete: false,
      });
    }
    if (form.isComplete && walletAddress) {
      setLoading(true);
      // setCreateRound({
      //   warranty: form.amount,
      //   saving: form.amount,
      //   groupSize: form.participants,
      //   payTime: paymentTime[form.periodicity],
      //   isPublic: false,
      //   walletAddress,
      // })
      //   .then(() => {
      //     setLoading(false);
      //     // setForm(INITIAL_FORM_VALUES);
      //     navigate("/create-round/receipt/success");
      //   })
      //   .catch((err) => {
      //     // setForm({
      //     //   ...form,
      //     //   isComplete: false,
      //     // });
      //     setLoading(false);
      //     navigate("/create-round/receipt/error");
      //   });
    }
  }, [form.isComplete]);

  return (
    <>
      <PageHeader title={t("createRound.title")} />
      {loading && <Loader />}
      {!loading && (
        <>
          <div className={styles.ReceiptCard}>
            <div className={styles.ReceiptCardItem}>
              <div>{t("createRound.form.label.participants")}</div>
              <div>{form.participants}</div>
            </div>
            <div className={styles.ReceiptCardItem}>
              <div>{t("createRound.labels.amount")}</div>
              <div>{`${form.amount} cUSD`}</div>
            </div>
            <div className={styles.ReceiptCardItem}>
              <div>{t("createRound.labels.receiptAmount")}</div>
              <div>{`${form.amount * (form.participants - 1)} cUSD`}</div>
            </div>
            <div className={styles.ReceiptCardItem}>
              <div>{t("createRound.labels.roundTime")}</div>
              <div>
                {/* {
                  periodicityOptions.find(
                    (option) => option.value === form.periodicity
                  ).label
                } */}
              </div>
            </div>
          </div>

          <ButtonOnlyOneStep
            loading={loading}
            label={t("createRound.actions.payGuarantee")}
            // disabled={!values.termsAndConditions || !isValid}
            type="submit"
            onClick={handlerOnSubmit}
          />
        </>
      )}
    </>
  );
};

Confirm.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
  setForm: PropTypes.func.isRequired,
};

export default React.memo(Confirm);
