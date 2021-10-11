/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import withAuthProvider from "../../providers/withAuthProvider";

import firebase from "../../api/config.firebase";
import Dashboard from "./Dashboard";

// const mapStateToProps = (state) => {
//   const currentAddress = state?.main?.currentAddress;
//   const userId = state?.user?.user?.uid;
//   return { currentAddress, userId };
// };

// const mapDispatchToProps = () => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
export default withAuthProvider(Dashboard);
