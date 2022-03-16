/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { Typography, Button, Modal } from "antd";
import { FormattedMessage } from "react-intl";

import APISetSaveInvitations from "../../api/setSaveInvitations";
import PageHeader from "../../components/PageHeader";
import InputEmailTags from "../../components/InputEmailTags";

const { Paragraph } = Typography;

function Form({ roundId }) {
  const history = useHistory();
  const [mailList, setMailList] = useState([]);

  const handleSendEmails = () => {
    APISetSaveInvitations(mailList, roundId)
      .then((status) => {
        console.log(status);
        Modal.success({
          title: "Invitaciones enviadas correctamente",
          content: "Por favor verifica.",
        });
        history.push(`/round-details?roundId=${roundId}`);
      })
      .catch((err) => {
        console.log(err);
        Modal.error({
          title: "Error al enviar las invitaciones",
          content: "Por favor verifica.",
        });
      });
  };

  const handlerOnChangeEmailList = (mails) => {
    setMailList(mails.target.value);
  };

  return (
    <>
      <PageHeader title={<FormattedMessage id="invitations.title" />} />
      <Paragraph>
        <FormattedMessage id="invitations.description" />
      </Paragraph>
      <Paragraph>
        <FormattedMessage id="invitations.caption" />
      </Paragraph>
      <InputEmailTags
        label={<FormattedMessage id="invitations.form.label.emails" />}
        name="email"
        placeholder="Ingresa el email"
        value={mailList}
        onChangeValue={handlerOnChangeEmailList}
      />
      {mailList.length > 0 && (
        <Button onClick={handleSendEmails}>
          <FormattedMessage id="commons.buttons.sendAndEnd" />
        </Button>
      )}
    </>
  );
}

Form.defaultProps = {
  roundId: undefined,
};

Form.propTypes = {
  roundId: PropTypes.string,
};

export default Form;
