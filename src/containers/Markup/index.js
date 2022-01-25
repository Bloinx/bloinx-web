/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";

import Navbar from "../../components/Navbar";
import NavAside from "../../components/NavAside";
import useWindowDimensions from "../../utils/useWindowDimensions";
import styles from "./index.module.scss";

function Markup({ children }) {
  const { width } = useWindowDimensions();
  const [visible, setVisible] = useState(false);

  const toggleDrawer = (status) => {
    if (status) {
      setVisible(!visible);
    } else {
      setVisible(status);
    }
  };

  const handleToggleDrawer = () => {
    if (visible) {
      setVisible(false);
    }
  };

  return (
    <div className={styles.Markup}>
      <Navbar width={width} toggleDrawer={toggleDrawer} visible={visible} />
      <NavAside width={width} toggleDrawer={toggleDrawer} visible={visible} />
      <div className={styles.MarkupContent} onClick={handleToggleDrawer}>
        {children}
      </div>
    </div>
  );
}

Markup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Markup;
