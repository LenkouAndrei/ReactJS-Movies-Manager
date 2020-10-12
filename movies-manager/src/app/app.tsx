import React, { useState } from 'react';
import {
  ErrorBoundary,
  Footer,
  Header,
  MainWithState,
  PageName,
} from '../containers';
import './app.scss';

function App(): JSX.Element {
  const [pageName, setPageName] = useState(PageName.Main);
  const [areDetailsVisible, setAreDetailsVisible] = useState(false);

  const changePage = () => {
    setPageName(PageName.Details);
    setAreDetailsVisible(true);
  };

  const clickSearchBtn = () => {
    setPageName(PageName.Main);
    setAreDetailsVisible(false);
  };

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Header
          onSearchBtnClick={clickSearchBtn}
          pageName={pageName}/>
        <MainWithState
          areDetailsVisible={areDetailsVisible}
          onChangePage={changePage}
        />
        <Footer />
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;