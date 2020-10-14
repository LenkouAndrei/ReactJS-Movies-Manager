import React from 'react';
import {
    Footer,
    Header,
    MainWithState,
    PageName,
} from '..';

type TSearchPage = () => JSX.Element;

export const SearchPage: TSearchPage = () => {
    return <>
        <Header pageName={PageName.Main} />
        <MainWithState />
        <Footer />
    </>;
};