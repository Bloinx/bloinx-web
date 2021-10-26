import { connect } from "react-redux";
import withAuthProvider from "../../providers/withAuthProvider";

import Dashboard from "./Dashboard";

const mapStateToProps = (state) => {
  const currentAddress = state?.main?.currentAddress;
  return { currentAddress };
};

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthProvider(Dashboard));
