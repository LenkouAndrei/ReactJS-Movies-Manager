import React, { Component } from "react";
import {
  Footer,
  Header,
  PageName,
  Main,
  ErrorBoundary,
  FormPage
} from "../containers";
import { TNullable, IMovie, TOutsideClick } from '../types/types';
import { OutsideClickContext } from "../context";
import "./app.component.scss";

interface IAppState {
	pageName: PageName;
	newMovie: TNullable<IMovie>;
    outsideClickHandler: TNullable<TOutsideClick>
}

class AppComponent extends Component<{}, IAppState> {
  outsideClickCtx = {
    setOutsideClickHandler: (outsideClickHandler: TOutsideClick) => {
      this.setState({ outsideClickHandler });
    },
  }

  constructor(props: any) {
    super(props);
    this.state = {
      pageName: PageName.Main,
      newMovie: null,
      outsideClickHandler: null,
    };
  }

  updateNewMovie = (newMovie: IMovie) => {
    this.setState({ newMovie });
  }

  handleOutsideClick = (event: any) => {
    if (this.state.outsideClickHandler === null) {
      return;
    }
    this.state.outsideClickHandler(event);
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
          <OutsideClickContext.Provider value={this.outsideClickCtx}>
            <div onClick={this.handleOutsideClick}>
              <Header onAddBtnClick={this.updateNewMovie} pageName={this.state.pageName}/>
              { mainContent }
              <Footer />
            </div>
          </OutsideClickContext.Provider>
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
}
export default AppComponent;
