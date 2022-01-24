/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Routes,
  Route,
  Switch,
  useLocation,
  useRoutes,
  BrowserRouter as Router,
} from "react-router-dom";

import Navbar from "../../components/Navbar";
import Markup from "../../containers/Markup";
import Form from "./Form";
import Confirm from "./Confirm";
// import Status from "./Status";

import { INITIAL_FORM_VALUES } from "./constants";

function CreateRound(props) {
  const [form, setForm] = useState(INITIAL_FORM_VALUES);

  return (
    <Markup>
      <Routes>
        <Route path="/" element={<Form form={form} setForm={setForm} />} />
        <Route
          path="/confirm"
          element={<Confirm form={form} setForm={setForm} />}
        />
      </Routes>
    </Markup>
  );
}

export default React.memo(CreateRound);
