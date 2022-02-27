import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Markup from "../Markup";
import Form from "./Form";
import Approve from "./Approve";
import Pay from "./Pay";
import Status from "./Status";

function Register() {
  const [dataForm, setDataForm] = useState({});
  console.log(dataForm);

  return (
    <Markup>
      <Routes>
        <Route path="/:roundID" element={<Form setDataForm={setDataForm} />} />
        <Route
          path="/:roundID/approve"
          element={<Approve dataForm={dataForm} setDataForm={setDataForm} />}
        />
        <Route
          path="/:roundID/pay"
          element={<Pay dataForm={dataForm} setDataForm={setDataForm} />}
        />
        <Route path="/:roundID/status/:status" element={<Status />} />
      </Routes>
    </Markup>
  );
}

export default React.memo(Register);
