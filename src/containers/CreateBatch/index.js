/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Form from "./Form";
import Confirm from "./Confirm";
import Receipt from "./Receipt";
import Status from "./Status";

import { INITIAL_FORM_VALUES } from "./constants";

function CreateRound() {
  const baseUrl = "/create-round";

  const [form, setForm] = useState(INITIAL_FORM_VALUES);

  return (
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
        path={`${baseUrl}/receipt`}
        component={() => <Receipt form={form} setForm={setForm} />}
      />
      <Route
        exact
        path={`${baseUrl}/status`}
        component={() => <Status form={form} setForm={setForm} />}
      />
    </Switch>
  );
}

export default React.memo(CreateRound);
