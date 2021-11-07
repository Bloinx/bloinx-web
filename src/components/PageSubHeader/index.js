import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import styles from "./styles.module.scss";

const { Title } = Typography;

const PageSubHeader = ({ title, action }) => {
  return (
    <div className={styles.PageSubHeader}>
      <Title level={5} className={styles.dashboardTitle}>
        {title}
      </Title>
      {action}
    </div>
  );
};

PageSubHeader.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
};

PageSubHeader.defaultProps = {
  action: "",
};

export default PageSubHeader;
