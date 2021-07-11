import { useState } from 'react';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import { IntlProvider, FormattedMessage } from 'react-intl';

import './global.scss';
import 'antd/dist/antd.css';

import es from '../locales/es.json';
import en from '../locales/en.json';
import wrapper from '../redux/store';
import Navbar from '../components/Navbar';
import NavAside from '../components/NavAside';
import flattenMessages from '../utils/locales';

const languages = { en, es };

const {
  Header, Content, Footer, Sider,
} = Layout;

function App({ Component, pageProps }) {
  const [sliderStatus, setSliderStatus] = useState(false);
  const { locale, defaultLocale } = useRouter();

  const messages = languages[locale];

  return (
    <IntlProvider messages={flattenMessages(messages)} locale={locale} defaultLocale={defaultLocale}>
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
              <Component {...pageProps} />
            </div>
          </Content>
          <Footer className="appFooter">
            <FormattedMessage id="copyright" />
          </Footer>
        </Layout>
      </Layout>
    </IntlProvider>
  );
}

export default wrapper.withRedux(App);
