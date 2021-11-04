import React from "react";

import { ApiOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

export default function Placeholder() {
  return (
    <div className={styles.Placeholder}>
      <ApiOutlined
        style={{ fontSize: "60px", color: "white", marginBottom: "10px" }}
      />
      Sin información para mostrar
      <span>Por favor crea una ronda</span>
    </div>
  );
}
