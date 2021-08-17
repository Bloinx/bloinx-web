import React from "react";

import { ApiOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

export default function Placeholder() {
  return (
    <div className={styles.Placeholder}>
      <ApiOutlined
        style={{ fontSize: "60px", color: "white", marginBottom: "10px" }}
      />
      Sin wallet encontrada
      <span>Por favor conecta tu wallet para continuar</span>
    </div>
  );
}
