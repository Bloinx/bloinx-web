import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import APIGetRoundDetail from "../../api/getRoundDetail";
import { getUrlParams } from "../../utils/browser";

import Details from "./Details";

function RoundDetails({ walletAddress, currentProvider }) {
  const history = useHistory();
  const baseUrl = "/round-details";
  const { roundId } = getUrlParams(history.location.search);

  const [roundData, setRoundData] = useState({});

  useEffect(() => {
    APIGetRoundDetail(roundId, currentProvider).then((dataRound) => {
      setRoundData(dataRound);
    });
  }, []);

  return (
    <Switch>
      <Route
        path={baseUrl}
        component={() => (
          <Details
            roundData={roundData}
            roundId={roundId}
            currentAddress={walletAddress}
            currentProvider={currentProvider}
          />
        )}
      />
    </Switch>
  );
}

RoundDetails.propTypes = {
  walletAddress: PropTypes.string.isRequired,
  currentProvider: PropTypes.string,
};

RoundDetails.defaultProps = {
  currentProvider: undefined,
};

const mapStateToProps = (state) => {
  const walletAddress = state?.main?.currentAddress;
  const currentProvider = state?.main?.currentProvider;
  return { walletAddress, currentProvider };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(RoundDetails));
