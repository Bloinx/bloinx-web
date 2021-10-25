/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./containers/Login";
import Logout from "./containers/Logout";
import SignUp from "./containers/Signup";
import Markup from "./containers/Markup";
import Dashboard from "./containers/Dashboard";
import CreateBatch from "./containers/CreateBatch";
import RegisterPay from "./containers/RegisterPay";
import RegisterUser from "./containers/RegisterUser";
import BatchDetails from "./containers/BatchDetails";
import { getInitialContractInstance } from "./redux/actions/main";

import "./App.scss";

function App({ initialContractInstance }) {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/signup" component={SignUp} />
      <Markup initialContractInstance={initialContractInstance}>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route path="/create-round" component={CreateBatch} />
        <Route exact path="/registeruser" component={RegisterUser} />
        <Route exact path="/registerpay" component={RegisterPay} />
        <Route
          exact
          path="/batch-details/:savingGroup"
          component={BatchDetails}
        />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </Markup>
    </Switch>
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
  initialContractInstance: (instance) =>
    dispatch(getInitialContractInstance(instance)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
