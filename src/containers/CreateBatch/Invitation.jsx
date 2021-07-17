// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import React, { useState } from 'react';
import { Typography, Button, notification } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux"

import InputEmailTags from '../../components/InputEmailTags';

const { Title, Paragraph } = Typography;

// eslint-disable-next-line no-unused-vars
function Invitation(props) {
  // eslint-disable-next-line no-unused-vars
  const [mailList, setMailList] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = React.useState(false);

  const sendEmail = async () => {
    // try {
    //   // const userEmail = ['gho0thubun@gmail.com', 'gho0thubun@hotmail.com'];
    //   const userEmail = mailList.trim().split(',');
    //   const subject = `Inviación a la tanda ${props.data.name}`;
    //   await userEmail.forEach((mail) => {
    //     axios.post('https://wtb2taazv8.execute-api.us-east-2.amazonaws.com/mandarMail/sendMail', {
    //       personalizations: [
    //         {
    //           to: [
    //             {
    //               email: mail,
    //             },
    //           ],
    //           dynamic_template_data: {
    //             user: userEmail,
    //             title: subject,
    //             // link: linkToVerify.data,
    //             name: 'Bloinx Team',
    //             name_tanda: props.data.name,
    //             date: props.data.date,
    //             type: props.data.type,
    //             longevity: props.data.longevity,
    //             participant: props.data.participant - 1,
    //             amount: props.data.amount,
    //           },
    //           subject,
    //         },
    //       ],
    //     });
    //   });
    //   await setOpen(true);
    //   await setMailList('');
    // } catch (error) {
    //   console.log(error);
    // }
  };
  // eslint-disable-next-line no-unused-vars
  const handleMail = (e) => {
    // setMailList(e.target.value);
  };

  // eslint-disable-next-line no-unused-vars
  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }

    // setOpen(false);
  };

  const openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      className: 'custom-class',
      style: {
        width: 600,
      },
    });
  };

  return (
    <>
      <Title level={4}>
        <FormattedMessage id="createBatch.titles.invitation.title" />
      </Title>
      <Paragraph>
        <FormattedMessage id="createBatch.titles.invitation.description" />
      </Paragraph>
      <InputEmailTags
        label={<FormattedMessage id="createBatch.form.label.emails" />}
        name="email"
        onChange={() => {}}
      />
      <Button onClick={sendEmail}>
        <FormattedMessage id="commons.buttons.send" />
      </Button>
      <Button onClick={openNotification}>not</Button>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log('><><><',state);
  return state;
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);
