import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import NavAside from './components/NavAside';
import Navbar from './components/Navbar';
import Routes from './routes';
import getSavingGroupsMethods from './utils/getSGContract';
import getInitialContractInstance from './redux/actions/main';

const {
  Header, Content, Footer, Sider,
} = Layout;

function App({ initialContractInstance }) {
  const [sliderStatus, setSliderStatus] = useState(false);

  const instanceContractsEnviroment = async () => {
    const instance = await getSavingGroupsMethods();
    initialContractInstance(instance);
  };

  useEffect(() => {
    instanceContractsEnviroment();
  }, []);

  return (
    <Layout className="appLayout">
      <Sider
        collapsible
        collapsed={sliderStatus}
        onCollapse={setSliderStatus}
      >
        <NavAside />
      </Sider>
      <Layout>
        <Header className="appHeader">
          <Navbar />
        </Header>
        <Content>
          <div className="appSiteLayoutBackground">
            <Routes />
          </div>
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
