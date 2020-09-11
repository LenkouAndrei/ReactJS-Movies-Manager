import React, { Component } from "react";
import {
  Footer,
  Header,
  PageName,
  Main,
  ErrorBoundary,
  FormPage
} from "../containers";
import { TNullable, IMovie } from '../types/types';
import { OverflowContext, overflows } from "../context";
import "./app.component.scss";

interface IAppState {
	pageName: PageName;
	newMovie: TNullable<IMovie>;
    overflowName: string;
}

class AppComponent extends Component<{}, IAppState> {
  setOverflow = (overflowName: string) => {
    this.setState({ overflowName });
  }
  overflowCtx = {
    overflow: overflows.inherit,
    setOverflow: this.setOverflow,
  }
  constructor(props: any) {
    super(props);
    this.state = {
      pageName: PageName.Main,
      newMovie: null,
      overflowName: '',
    };
  }

  updateNewMovie = (newMovie: IMovie) => {
    this.setState({ newMovie });
  }

  render() {
    let mainContent: TNullable<JSX.Element> = null;
    switch(this.state.pageName) {
      case PageName.Main:
        mainContent = <Main movieToAdd={this.state.newMovie}/>;
        break;
      case PageName.AddForm:
        mainContent = <FormPage {...null}/>;
      default:
          break;
    }
    return (
      <React.StrictMode>
        <ErrorBoundary>
          <OverflowContext.Provider value={this.overflowCtx}>
            <div className={this.state.overflowName}>
              <Header onAddBtnClick={this.updateNewMovie} pageName={this.state.pageName}/>
              { mainContent }
              <Footer />
            </div>
          </OverflowContext.Provider>
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
}
export default AppComponent;