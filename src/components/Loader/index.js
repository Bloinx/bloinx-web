import React from "react";
import { CubeSpinner } from "react-spinners-kit";

import styles from "./index.module.scss";

const Loader = ({ message }) => (
  <div className={styles.Loader}>
    <CubeSpinner frontColor="#F58F98" size={30} />
    <p>{message || "createRound.titleReceipt"}</p>
  </div>
);

export default React.memo(Loader);
