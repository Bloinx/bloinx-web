import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

import Navbar from "../../components/Navbar";
import NavAside from "../../components/NavAside";
import getSavingGroupsMethods from "../../utils/getSGContract";
import useWindowDimensions from "../../utils/useWindowDimensions";

const { Header, Content, Footer } = Layout;

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

  const instanceContractsEnviroment = async () => {
    const instance = await getSavingGroupsMethods();
    initialContractInstance(instance);
  };

  useEffect(() => {
    instanceContractsEnviroment();
  }, []);

  return (
    <Layout className="appLayout">
      <NavAside width={width} toggleDrawer={toggleDrawer} visible={visible} />
      <Layout>
        <Header className="appHeader">
          <Navbar width={width} toggleDrawer={toggleDrawer} visible={visible} />
        </Header>
        <Content className="appSection">{children}</Content>
        <Footer className="appFooter">
          <FormattedMessage id="copyright" />
        </Footer>
      </Layout>
    </Layout>
  );
}

Markup.propTypes = {
  children: PropTypes.node.isRequired,
  initialContractInstance: PropTypes.func.isRequired,
};

export default Markup;
