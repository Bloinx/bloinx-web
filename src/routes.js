import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './containers/Dashboard';
import CreateBatch from './containers/CreateBatch';
import RegisterPay from './containers/RegisterPay';

export default function Routes() {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/createbatch" component={CreateBatch} />
      <Route path="/registerpay" component={RegisterPay} />
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
    </Switch>
  );
}
