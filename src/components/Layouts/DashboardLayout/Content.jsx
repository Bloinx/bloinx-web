import React from "react";
import PropTypes from "prop-types";
import styles from "./Content.module.scss";

export default function Content({ children }) {
  return <div className={styles.Content}>{children}</div>;
}

Content.propTypes = {
  children: PropTypes.node.isRequired,
};
