import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Markup from "../Markup";
import Form from "./Form";
import Approve from "./Approve";
import Pay from "./Pay";
import Status from "./Status";
import {
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Invite from "./Invite";
import { color } from "@mui/system";

//import RegisterStepper from "../../components/Stepper/index";

function Register() {
  function getSteps() {
    return ["Turno", "Aprovar", "Pagar", "Invitar"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Form handleNext={handleNext} handleBack={handleBack} />
      case 1:
        return <Approve handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return (
          /*           <Status
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            steps={steps}
          /> */ <Status handleNext={handleNext} handleBack={handleBack} />
        );
      case 3:
        return (
          /*           <Invite
            handleNext={handleNext}
            handleBack={handleBack}
            activeStep={activeStep}
            steps={steps}
          /> */
          <h1>Aqui va el Invite</h1>
        );
      default:
        return "Unknown step";
    }
  }
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === -1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  return (
    <div>
      <Markup>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          sx={{
            backgroundColor: "#2b2d33",
            color: "white",
            borderRadius: "10px",
          }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step
                sx={{
                  marginTop: "30px",
                  marginBottom: "20px",
                }}
                key={label}
                {...stepProps}
              >
                <StepLabel {...labelProps}>
                  <Typography
                    sx={{ color: "white!important", fontSize: "20px" }}
                  >
                    {" "}
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          <div>
            <Typography>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )}

              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </Markup>
    </div>
  );
}

/*  const [activeStep, setActiveStep] = useState("");
  const [dataForm, setDataForm] = useState({});

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const steps = [Routes.name];

  return (
    <div>
      <Markup>
        <Stepper>
          <Step>
            <StepLabel>Turno</StepLabel>
            <StepContent
              children={<Form setDataForm={setDataForm} />}
            ></StepContent>
          </Step>
          <Step>
            <StepLabel>Aprobar</StepLabel>
          </Step>
          <Step>
            <StepLabel>Pagar</StepLabel>
          </Step>
          <Step>
            <StepLabel>Invitar</StepLabel>
          </Step>
        </Stepper>
      </Markup>
    </div>
  );
}
 */
/*    
      <RegisterStepper activeStep={activeStep} steps={steps} />
      <Pay />
      <Routes>
        <Route
          path="/:roundID"
          onBlur={handleStep(index)}
          element={}
        />
        <Route
          path="/:roundID/approve"
          element={
            <Approve
              dataForm={dataForm}
              activeStep={2}
              setDataForm={setDataForm}
            />
          }
        />£•
        <Route
          path="/:roundID//pay"
          onBlur={handleStep(index)}
          element={
            <Pay
              dataForm={dataForm}
              setDataForm={setDataForm}
              name={"Aprobar"}
            />
          }
        />
        <Route
          name={"Turno"}
          path="/:roundID/status/:status"
          onBlur={handleStep(index)}
          element={<Status />}
        />
      </Routes>
    </Markup> */

export default React.memo(Register);
