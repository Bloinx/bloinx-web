import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './containers/Dashboard';
import CreateBatch from './containers/CreateBatch';
import RegisterPay from './containers/RegisterPay';
import RegisterUser from './containers/RegisterUser';
import BatchDetails from './containers/BatchDetails';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/createbatch" component={CreateBatch} />
      <Route exact path="/registeruser" component={RegisterUser} />
      <Route exact path="/registerpay" component={RegisterPay} />
      <Route exact path="/batchDetails" component={BatchDetails} />
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  );
}
