import React from "react";
import { Layout } from "antd";
import { FormattedMessage } from "react-intl";

const { Footer } = Layout;

function MyFooter() {
  return (
    <Footer className="appFooter">
      <FormattedMessage id="copyright" />
    </Footer>
  );
}

export default React.memo(MyFooter);
