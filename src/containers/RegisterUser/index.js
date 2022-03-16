/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

import Terms from "./Terms";
import Form from "./Form";
import Receipt from "./Receipt";
import { getUrlParams } from "../../utils/browser";
import APIgetRoundRegisterDetail from "../../api/getRoundRegisterDetail";

import { INITIAL_FORM_VALUES } from "./constants";

function RegisterUser({ walletAddress, provider }) {
  const history = useHistory();
  const baseUrl = "/register-user";
  const { roundId } = getUrlParams(history.location.search);

  const [form, setForm] = useState(INITIAL_FORM_VALUES);
  const [roundData, setRoundData] = useState({});

  useEffect(() => {
    APIgetRoundRegisterDetail(roundId, provider).then((dataRound) => {
      setRoundData(dataRound);
    });
  }, []);

  return (
    <Switch>
      <Route
        exact
        path={baseUrl}
        component={() => (
          <Terms
            form={form}
            setForm={setForm}
            roundData={roundData}
            walletAddress={walletAddress}
            baseUrl={baseUrl}
            provider={provider}
          />
        )}
      />
      <Route
        path={`${baseUrl}/join`}
        component={() => (
          <Form
            form={form}
            setForm={setForm}
            roundData={roundData}
            walletAddress={walletAddress}
            provider={provider}
          />
        )}
      />
      <Route path={`${baseUrl}/success`} component={() => <Receipt />} />
    </Switch>
  );
}

RegisterUser.defaultProps = {
  walletAddress: undefined,
  provider: null,
};

RegisterUser.propTypes = {
  walletAddress: PropTypes.string,
  provider: PropTypes.string,
};

const mapStateToProps = (state) => {
  console.log("RGUser ", state);
  const walletAddress = state?.main?.currentAddress;
  const provider = state?.main?.currentProvider;
  return { walletAddress, provider };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
