import React, { Component } from "react";
import { Footer, Header, Main } from "../containers";
import "./app.component.scss";

class AppComponent extends Component {
  render() {
    return (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    );
  }
}
export default AppComponent;