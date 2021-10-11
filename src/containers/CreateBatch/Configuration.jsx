/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Typography } from "antd";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import InputSlider from "../../components/InputSlider";
import InputSelect from "../../components/InputSelect";
import InputAmount from "../../components/InputAmount";
import ButtonNextStep from "../../components/ButtonNextStep";

const { Title, Paragraph } = Typography;

const periodicyList = [
  {
    value: "Semanal",
    label: "Semanal",
  },
  {
    value: "Quincenal",
    label: "Quincenal",
  },
  {
    value: "Mensual",
    label: "Mensual",
  },
  {
    value: "Bimestral",
    label: "Bimestral",
  },
];

const Configuration = ({ onBack, onSuccess, formData, onChangeValue }) => {
  // eslint-disable-next-line no-unused-vars
  const [isValidAmount, setValidAmount] = useState(false);
  const isComplete = formData && formData.amount;

  // eslint-disable-next-line no-unused-vars
  const handlePass = (event) => {
    //   if (event.target.name === 'amount' && event.target.value >= 100) {
    //     setValidAmount(true);
    //   } else {
    //     setValidAmount(false);
    //   }
    //   props.handleChange(event.target);
  };

  // eslint-disable-next-line no-unused-vars
  const handleSlider = (event, value) => {
    //   const participant = {
    //     name: 'participant',
    //     value,
    //   };
    //   onChangeValue({ target });
  };

  // eslint-disable-next-line no-unused-vars
  const handleNextStep = () => {
    //   let step = props.currentStep;
    //   // If the current step is 1 or 2, then add one on "next" button click
    //   step = step >= 2 ? 3 : step + 1;
    //   props.stepMove(step);
  };

  // eslint-disable-next-line no-unused-vars
  const handlePrevStep = () => {
    //   let step = props.currentStep;
    //   // If the current step is 2 or 3, then subtract one on "previous" button click
    //   step = step <= 1 ? 1 : step - 1;
    //   props.stepMove(step);
  };

  return (
    <>
      <Title level={4}>
        <FormattedMessage id="createBatch.titles.configuration.title" />
      </Title>
      <Paragraph>
        <FormattedMessage id="createBatch.titles.configuration.description" />
      </Paragraph>
      <InputSlider
        min={3}
        max={10}
        label={<FormattedMessage id="createBatch.form.label.participants" />}
        value={formData.participant}
        onChange={onChangeValue}
        name="participant"
      />
      <InputSelect
        label={<FormattedMessage id="createBatch.form.label.longevity" />}
        options={periodicyList}
        value={formData.longevity}
        onChange={onChangeValue}
        name="longevity"
      />
      <InputAmount
        label={<FormattedMessage id="createBatch.form.label.amount" />}
        value={formData.amount}
        currency="MXN"
        onChange={onChangeValue}
        name="amount"
      />
      <ButtonNextStep
        disabled={!isComplete}
        onClick={onSuccess}
        onBack={onBack}
      />

      {/*
        <TextField
          // error={props.data.amount < 100 && props.data.amount !== ''}
          // helperText={props.data.amount < 100 && props.data.amount !== '' ? 'Min 100 MXN' : ''}
          className="figmaInputStyles"
          id="outlined-error-helper-text"
          name="amount"
          variant="outlined"
          // value={props.data.amount}
          onChange={handlePass}
          placeholder="$"
          label="$  MXN"
          type="number"
          min={100}
          size="small"
        />
      </div>

    </div> */}
    </>
  );
};

const mapStateToProps = (state) => state;

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Configuration);
