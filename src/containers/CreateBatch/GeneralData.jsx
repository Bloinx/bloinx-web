/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Typography, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import InputTextField from "../../components/InputTextField";
import InputDatePicker from "../../components/InputDatePicker";
import InputOptionSelect from "../../components/InputOptionSelect";

const { Title, Paragraph } = Typography;

function GeneralData({ formData, onSuccess, onChangeValue }) {
  const isComplete = formData && formData.name;

  return (
    <>
      <Title level={4}>
        <FormattedMessage id="createBatch.titles.generalData.title" />
      </Title>
      <Paragraph>
        <FormattedMessage id="createBatch.titles.generalData.description" />
      </Paragraph>
      <InputTextField
        label={<FormattedMessage id="createBatch.form.label.batchName" />}
        placeholder={
          <FormattedMessage id="createBatch.form.placeholder.batchName" />
        }
        value={formData.name}
        onChange={onChangeValue}
        name="name"
      />
      <InputDatePicker
        label={<FormattedMessage id="createBatch.form.label.startDate" />}
        value={formData.startDate}
        onChange={onChangeValue}
        name="startDate"
      />
      <InputOptionSelect
        label={<FormattedMessage id="createBatch.form.label.batchType" />}
        value={formData.isPrivate}
        onChange={onChangeValue}
        options={[
          {
            label: (
              <FormattedMessage id="createBatch.form.label.batchTypeOptions.public" />
            ),
            value: false,
          },
          {
            label: (
              <FormattedMessage id="createBatch.form.label.batchTypeOptions.private" />
            ),
            value: true,
          },
        ]}
        name="isPrivate"
      />
      <Button type="primary" disabled={!isComplete} onClick={onSuccess}>
        <FormattedMessage id="commons.buttons.next" />
      </Button>
    </>
  );
}

GeneralData.defaultProps = {
  formData: {},
};

GeneralData.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    isPrivate: PropTypes.bool,
  }),
};

const mapStateToProps = (state) => state;
// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(GeneralData);
