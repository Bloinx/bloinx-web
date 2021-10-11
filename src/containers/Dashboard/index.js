/* eslint-disable no-unused-vars */
import { connect } from "react-redux";
import firebase from "../../api/config.firebase";

import Dashboard from "./Dashboard";

const mapStateToProps = (state) => {
  const currentAddress = state?.main?.currentAddress;
  const userId = state?.user?.user?.uid;
  return { currentAddress, userId };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
