import { connect } from "react-redux";
import withAuthProvider from "../../providers/withAuthProvider";

import Dashboard from "./Dashboard";

const mapStateToProps = (state) => {
  const currentAddress = state?.main?.currentAddress;
  const currentProvider = state?.main?.currentProvider;
  return { currentAddress, currentProvider };
};

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthProvider(Dashboard));
