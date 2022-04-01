/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";

import PageHeader from "../../components/PageHeader";
import PageSubHeader from "../../components/PageSubHeader";
import InputLabel from "../../components/InputLabel";

import { formatAddress } from "../../utils/format";
import styles from "./Details.module.scss";
import getFuturePayments from "../../api/getFuturePayments";

function Details({ roundData, roundId, currentAdress, currentProvider }) {
  const [futurePayment, setFuturePayment] = useState("");

  const totalRemain = async () => {
    const response = await getFuturePayments(
      roundId,
      currentAdress,
      currentProvider
    );
    if (response) {
      setFuturePayment(response);
    } else {
      console.log("Something went wrong");
    }
  };
  totalRemain();

  return (
    <>
      <PageHeader title={roundData.positionData?.name} />
      <InputLabel
        label="ContratoID"
        value={formatAddress(roundData.contract)}
      />
      <InputLabel label="Estatus de la ronda" value={roundData.stage} />
      <InputLabel label="Total restante" value={futurePayment} />
      <InputLabel
        label="Participantes"
        value={
          <table className={styles.DetailParticipantsItem}>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Cobro</th>
            </tr>
            {roundData.participantsData &&
              roundData.participantsData.map((participant) => (
                <tr key={participant.address}>
                  <th>{participant.position}</th>
                  <th>{formatAddress(participant.address)}</th>
                  <th>{participant.admin && "Admin"}</th>
                  <th>{participant.dateToWithdraw}</th>
                </tr>
              ))}
          </table>
        }
      />
      {roundData.stage === "ON_REGISTER_STAGE" && (
        <>
          <PageSubHeader title="Invitaciones" />
          <Link
            to={`/invitations?roundId=${roundId}`}
            className={styles.RoundCardTitle}
          >
            <MailOutlined style={{ color: "white", fontSize: "20px" }} />
          </Link>
          <InputLabel
            label="Invitaciones enviadas"
            value={
              <div className={styles.DetailParticipantsItem}>
                {roundData.invitations &&
                  roundData.invitations.map((email) => (
                    <ul key={email}>
                      <li>{email}</li>
                    </ul>
                  ))}
              </div>
            }
          />
        </>
      )}
    </>
  );
}

export default Details;
