import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import NavAside from './components/NavAside';
import Navbar from './components/Navbar';
import Routes from './routes';
import getSavingGroupsMethods from './utils/getSGContract';
import useWindowDimensions from './utils/useWindowDimensions';
import { getInitialContractInstance } from './redux/actions/main';

import './App.scss';

const { Header, Content, Footer } = Layout;

function App({ initialContractInstance }) {
  const { width } = useWindowDimensions();

  const [visible, setVisible] = useState(false);

  const instanceContractsEnviroment = async () => {
    const instance = await getSavingGroupsMethods();
    initialContractInstance(instance);
  };

  const toggleDrawer = (status) => {
    if (status) {
      setVisible(!visible);
    } else {
      setVisible(status);
    }
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
        <Content className="appSection">
          <Routes />
        </Content>
        <Footer className="appFooter">
          <FormattedMessage id="copyright" />
        </Footer>
      </Layout>
    </Layout>
  );
}

App.defaultProps = {
  initialContractInstance: () => {},
};

App.propTypes = {
  initialContractInstance: PropTypes.func,
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  initialContractInstance: (instance) => dispatch(getInitialContractInstance(instance)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
