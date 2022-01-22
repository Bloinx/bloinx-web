/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";

import { INITIAL_FORM_VALUES } from "./constants";

function CreateRound() {
  const baseUrl = "/create-round";

  const [form, setForm] = useState(INITIAL_FORM_VALUES);

  return (
    <>
      <Navbar />
      <Switch>
        <Route
          exact
          path={baseUrl}
          component={() => <Form form={form} setForm={setForm} />}
        />
        <Route
          exact
          path={`${baseUrl}/confirm`}
          component={() => <Confirm form={form} setForm={setForm} />}
        />
        <Route
          exact
          path={`${baseUrl}/receipt/:status(success|error)`}
          component={() => <Status form={form} setForm={setForm} />}
        />
      </Switch>
    </>
  );
}

export default React.memo(CreateRound);
