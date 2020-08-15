import React, { Component } from "react";
import { Footer, Header, PageName, IHeaderProps, Main, ErrorBoundary } from "../containers";
import { TNullable } from '../types/types';
import "./app.component.scss";

class AppComponent extends Component<{}, IHeaderProps> {
  constructor(props: any) {
    super(props);
    this.state = {pageName: PageName.Form};
  }
  render() {
    let mainContent: TNullable<JSX.Element> = null;
    switch(this.state.pageName) {
      case PageName.Main:
        mainContent = <Main />;
        break;
      default:
          break;
    }
    return (
      <React.StrictMode>
        <ErrorBoundary>
          <Header pageName={this.state.pageName}/>
          { mainContent }
          <Footer />
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
}
export default AppComponent;