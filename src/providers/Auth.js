import React from "react";

function AuthProvider(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentDidMount() {
      // // ... que se encarga de la suscripción...
      // DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      // DataSource.removeChangeListener(this.handleChange);
    }

    render() {
      return <WrappedComponent />;
    }
  };
}
