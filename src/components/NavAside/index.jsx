/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Menu, Layout, Drawer } from "antd";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  DesktopOutlined,
  HomeFilled,
  // FileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import LogOut from "../../api/setLogout";

import styles from "./styles.module.scss";
import logo from "../../assets/bloinxLogo.png";
import icon from "../../assets/icon.png";

const { Sider } = Layout;

function NavAside({ user, width, toggleDrawer, visible }) {
  const [sliderStatus, setSliderStatus] = useState(false);
  const isTablet = width <= 800;
  const isMobile = width <= 768;

  useEffect(() => {
    if (isTablet && !sliderStatus) {
      setSliderStatus(true);
    }
    if (!isMobile) {
      toggleDrawer();
    }
  }, [width]);

  const selected = 1;

  const MenuOptions = () => (
    <Menu
      className={styles.MenuOptions}
      defaultSelectedKeys={["1"]}
      mode="inline"
    >
      {!isMobile && (
        <div className={classnames(styles.logo, sliderStatus && styles.icon)}>
          <img src={sliderStatus ? icon : logo} alt="bloinx-logo" />
        </div>
      )}
      <Menu.Item key={0} className={styles.MenuItem} onClick={toggleDrawer}>
        <span>{user.email}</span>
      </Menu.Item>
      <Menu.Item
        className={classnames(
          styles.MenuItem,
          selected === 1 && styles.MenuItemSelected
        )}
        key={1}
        icon={<HomeFilled />}
        onClick={toggleDrawer}
      >
        <Link to="/dashboard">
          <span>
            <FormattedMessage id="navAside.dashboard" />
          </span>
        </Link>
      </Menu.Item>

      <Menu.Item
        className={classnames(
          styles.MenuItem,
          selected === 2 && styles.MenuItemSelected
        )}
        key={2}
        icon={<LogoutOutlined />}
        onClick={LogOut}
      >
        <span>
          <FormattedMessage id="navAside.logout" />
        </span>
      </Menu.Item>
      <Menu.Item
        className={classnames(
          styles.MenuItem,
          selected === 3 && styles.MenuItemSelected
        )}
        key={3}
        icon={<DesktopOutlined />}
        onClick={toggleDrawer}
      >
        <a target="_blank" href="https://docs.bloinx.io/" rel="noreferrer">
          <span>
            <FormattedMessage id="navAside.docs" />
          </span>
        </a>
      </Menu.Item>
      {/* <Menu.Item
        className={classnames(
          styles.MenuItem,
          selected === 3 && styles.MenuItemSelected,
        )}
        key={3}
        icon={<FileOutlined />}
        onClick={toggleDrawer}
      >
        <Link to="/degisterPay">
          <span>
            <FormattedMessage id="navAside.registerpay" />
          </span>
        </Link>
      </Menu.Item> */}
      {/* <Menu.Item
        className={classnames(
          styles.MenuItem,
          selected === 4 && styles.MenuItemSelected,
        )}
        key={4}
        icon={<FileOutlined />}
        onClick={toggleDrawer}
      >
        <Link to="/BatchDetails">
          <span>
            <FormattedMessage id="navAside.batchDetails" />
          </span>
        </Link>
      </Menu.Item> */}
    </Menu>
  );

  return (
    <>
      {!isMobile && (
        <Sider
          collapsible={!isTablet}
          collapsed={sliderStatus}
          onCollapse={setSliderStatus}
          className={styles.NavAside}
        >
          <MenuOptions />
        </Sider>
      )}
      {isMobile && (
        <Drawer
          title={
            <div className={styles.logoMobile}>
              <img src={logo} alt="bloinx-logo" />
            </div>
          }
          placement="left"
          closable
          onClose={toggleDrawer}
          visible={visible}
          bodyStyle={{
            padding: 0,
          }}
          drawerStyle={{
            backgroundColor: "#2B2D33",
          }}
          headerStyle={{
            backgroundColor: "#2B2D33",
            borderBottom: "0px",
            color: "white",
            padding: "0px",
          }}
        >
          <MenuOptions />
        </Drawer>
      )}
    </>
  );
}

NavAside.propTypes = {
  user: PropTypes.instanceOf(Object),
  visible: PropTypes.bool,
  width: PropTypes.number.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

NavAside.defaultProps = {
  user: undefined,
  visible: false,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(NavAside);
