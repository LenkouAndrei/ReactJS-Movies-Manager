import React, { Component } from "react";
import { Footer, Header, Main, ErrorBoundary } from "../containers";
import "./app.component.scss";

class AppComponent extends Component {
  render() {
    return (
      <React.StrictMode>
        <ErrorBoundary>
          <Header />
          <Main />
          <Footer />
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
}
export default AppComponent;