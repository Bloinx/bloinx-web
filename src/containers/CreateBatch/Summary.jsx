/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Typography, Row, Col } from "antd";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import InputSelect from "../../components/InputSelect";
import { ButtonNextStep } from "../../components/ButtonNextStep";

const { Title, Paragraph } = Typography;

function Summary({ formData, goBack, onSuccess }) {
  const isComplete = true;
  // eslint-disable-next-line no-unused-vars
  const [isValidTurn, setValidTurn] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const handlePass = (event) => {
    // if (event.target.name === 'adminposition' &&
    // (event.target.value >= 1 && event.target.value <= props.data.participant)) {
    //   setValidTurn(true);
    // } else {
    //   setValidTurn(false);
    // }
    // props.handleChange(event.target);
  };

  return (
    <>
      <Title level={4}>
        <FormattedMessage id="createBatch.titles.resume.title" />
      </Title>
      <Paragraph>
        <FormattedMessage id="createBatch.titles.resume.description" />
      </Paragraph>
      <Row>
        <Col span={12}>
          <FormattedMessage id="createBatch.form.label.admin" />
        </Col>
        <Col span={12}>USERR</Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormattedMessage id="createBatch.form.label.batchName" />
        </Col>
        <Col span={12}>{formData.name}</Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormattedMessage id="createBatch.form.label.participants" />
        </Col>
        <Col span={12}>{formData.participant}</Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormattedMessage id="createBatch.form.label.longevity" />
        </Col>
        <Col span={12}>{formData.longevity}</Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormattedMessage id="createBatch.form.label.amount" />
        </Col>
        <Col span={12}>{formData.amount}</Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormattedMessage id="createBatch.form.label.startDate" />
        </Col>
        <Col span={12}>{JSON.stringify(formData.startDate)}</Col>
      </Row>
      <Row>
        <Col span={12}>
          <FormattedMessage id="createBatch.form.label.position" />
        </Col>
        <Col span={12}>
          <InputSelect options={[{ value: 1, lable: "1" }]} value="1" />
        </Col>
      </Row>
      <ButtonNextStep
        disabled={!isComplete}
        onClick={onSuccess}
        onBack={goBack}
      />
    </>
  );
}

const mapStateToProps = (state) => state;
// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
