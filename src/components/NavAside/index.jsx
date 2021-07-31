import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Menu, Layout, Drawer } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { DesktopOutlined, PieChartOutlined, FileOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const { Sider } = Layout;

export default function NavAside({ width, toggleDrawer, visible }) {
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

  const MenuOptions = () => (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      {!isMobile && (
        <div className={styles.logo} />
      )}
      <Menu.Item key="1" icon={<PieChartOutlined />} onClick={toggleDrawer}>
        <Link to="/Dashboard">
          <span>
            <FormattedMessage id="navAside.dashboard" />
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />} onClick={toggleDrawer}>
        <Link to="/CreateBatch">
          <span>
            <FormattedMessage id="navAside.createbatch" />
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<FileOutlined />} onClick={toggleDrawer}>
        <Link to="/RegisterPay">
          <span>
            <FormattedMessage id="navAside.registerpay" />
          </span>
        </Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<FileOutlined />} onClick={toggleDrawer}>
        <Link to="/BatchDetails">
          <span>
            <FormattedMessage id="navAside.batchDetails" />
          </span>
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {!isMobile && (
        <Sider
          collapsible={!isTablet}
          collapsed={sliderStatus}
          onCollapse={setSliderStatus}
        >
          <MenuOptions />
        </Sider>
      )}
      {isMobile && (
        <Drawer
          title="Basic Drawer"
          placement="left"
          closable
          onClose={toggleDrawer}
          visible={visible}
          bodyStyle={{
            padding: 0,
          }}
        >
          <MenuOptions />
        </Drawer>
      )}
    </>
  );
}

NavAside.propTypes = {
  width: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};
