/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import Navbar from "../../components/Navbar";
import NavAside from "../../components/NavAside";
import useWindowDimensions from "../../utils/useWindowDimensions";
import styles from "./index.module.scss";

function Markup({ children, initialContractInstance }) {
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const toggleDrawer = (status) => {
    if (status) {
      setVisible(!visible);
    } else {
      setVisible(status);
    }
  };

  return (
    <div className={styles.Markup}>
      <NavAside width={width} toggleDrawer={toggleDrawer} visible={visible} />
      <div className={styles.MarkupContent}>
        <Navbar width={width} toggleDrawer={toggleDrawer} visible={visible} />
        {children}
      </div>
    </div>
  );
}

Markup.propTypes = {
  children: PropTypes.node.isRequired,
  initialContractInstance: PropTypes.func.isRequired,
};

export default Markup;
