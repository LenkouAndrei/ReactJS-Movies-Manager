import React from 'react';
import {
    Footer,
    Header,
    MainWithState,
    PageName,
} from '..';

type TDetailsPage = () => JSX.Element;

export const DetailsPage: TDetailsPage = () => {
    return <>
        <Header pageName={PageName.Details} />
        <MainWithState />
        <Footer />
    </>;
};