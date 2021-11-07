/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React from "react";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";

import PageHeader from "../../components/PageHeader";
import PageSubHeader from "../../components/PageSubHeader";
import InputLabel from "../../components/InputLabel";

import { formatAddress } from "../../utils/format";
import styles from "./Details.module.scss";

function Details({ roundData, roundId }) {
  return (
    <>
      <PageHeader title={roundData.positionData?.name} />
      <InputLabel
        label="ContratoID"
        value={formatAddress(roundData.contract)}
      />
      <InputLabel label="Estatus de la ronda" value={roundData.stage} />
      <InputLabel
        label="Participantes"
        value={
          <div className={styles.DetailParticipantsItem}>
            {roundData.participantsData &&
              roundData.participantsData.map((participant) => (
                <ul>
                  <li>{participant.position}</li>
                  <li>{formatAddress(participant.address)}</li>
                  <li>{participant.admin && "Admin"}</li>
                </ul>
              ))}
          </div>
        }
      />
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
                <ul>
                  <li>{email}</li>
                </ul>
              ))}
          </div>
        }
      />
    </>
  );
}

export default Details;
