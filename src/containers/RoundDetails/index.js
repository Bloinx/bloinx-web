import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import APIGetRoundDetail from "../../api/getRoundDetail";
import { getUrlParams } from "../../utils/browser";

import Details from "./Details";

function RoundDetails({ walletAddress }) {
  const history = useHistory();
  const baseUrl = "/round-details";
  const { roundId } = getUrlParams(history.location.search);

  const [roundData, setRoundData] = useState({});

  useEffect(() => {
    APIGetRoundDetail(roundId).then((dataRound) => {
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
            walletAddress={walletAddress}
          />
        )}
      />
    </Switch>
  );
}

RoundDetails.propTypes = {
  walletAddress: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const walletAddress = state?.main?.currentAddress;
  return { walletAddress };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(memo(RoundDetails));
