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
import "./app.component.scss";

interface IAppState {
	pageName: PageName;
	newMovie: TNullable<IMovie>;
}

class AppComponent extends Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      pageName: PageName.Main,
      newMovie: null,
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
          <Header onAddBtnClick={this.updateNewMovie} pageName={this.state.pageName}/>
          { mainContent }
          <Footer />
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
}
export default AppComponent;