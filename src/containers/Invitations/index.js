/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

import Form from "./Form";
import Receipt from "./Receipt";
import { getUrlParams } from "../../utils/browser";

function RegisterUser({ walletAddress, provider }) {
  const history = useHistory();
  const baseUrl = "/invitations";
  const { roundId } = getUrlParams(history.location.search);

  return (
    <Switch>
      <Route
        path={baseUrl}
        component={() => (
          <Form
            roundId={roundId}
            provider={provider}
            // walletAddress={walletAddress}
          />
        )}
      />
      <Route path={`${baseUrl}/success`} component={() => <Receipt />} />
    </Switch>
  );
}

RegisterUser.defaultProps = {
  walletAddress: undefined,
  provider: undefined,
};

RegisterUser.propTypes = {
  walletAddress: PropTypes.string,
  provider: PropTypes.string,
};

const mapStateToProps = (state) => {
  const walletAddress = state?.main?.currentAddress;
  const provider = state?.main?.currentProvider;
  return { walletAddress, provider };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
