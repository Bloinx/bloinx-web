import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Markup from "../../containers/Markup";
import Form from "./Form";
import Confirm from "./Confirm";
import Status from "./Status";

function CreateRound(props) {
  const [form, setForm] = useState({
    participants: 3,
    amount: 1,
    periodicity: "monthly",
  });

  return (
    <Markup>
      <Routes>
        <Route path="/" element={<Form form={form} setForm={setForm} />} />
        <Route
          path="/confirm"
          element={<Confirm formData={form} setForm={setForm} />}
        />
        <Route path="/status/:status" element={<Status />} />
      </Routes>
    </Markup>
  );
}

export default React.memo(CreateRound);
