/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Form from "./Form";

const CreateRound = () => {
  const [form, setForm] = useState({
    participants: 5,
    amount: 100,
    periodicity: "weekly",
  });

  const onChangeValue = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  return (
    <Switch>
      <Route
        exact
        path="/create-round"
        component={() => <Form form={form} onChangeValue={onChangeValue} />}
      />
      <Route
        exact
        path="/create-round/confirm"
        component={() => <Form form={form} onChangeValue={onChangeValue} />}
      />
    </Switch>
  );
};

export default CreateRound;
