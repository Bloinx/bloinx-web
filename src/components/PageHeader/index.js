import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

import styles from "./styles.module.scss";

const PageHeader = ({ title, action }) => {
  return (
    <div className={styles.PageHeader}>
      <Typography variant="h6" className={styles.dashboardTitle}>
        {title}
      </Typography>
      {action}
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func])
    .isRequired,
  action: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
};

PageHeader.defaultProps = {
  action: "",
};

export default PageHeader;
