import React from "react";
import { FormattedMessage } from "react-intl";

import { ApiOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

export default function Placeholder() {
  return (
    <div className={styles.Placeholder}>
      <ApiOutlined
        style={{ fontSize: "60px", color: "white", marginBottom: "10px" }}
      />
      <FormattedMessage id="infoLabels.withoutInfo" />
      <span>
        <FormattedMessage id="infoLabels.createRoundMessage" />
      </span>
    </div>
  );
}
