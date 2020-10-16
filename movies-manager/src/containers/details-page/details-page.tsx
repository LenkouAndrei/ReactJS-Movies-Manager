import React from 'react';
import {
    Header,
    MainWithState,
    PageName,
} from '..';

type TDetailsPage = () => JSX.Element;

export const DetailsPage: TDetailsPage = () => {
    return <>
        <Header pageName={PageName.Details} />
        <MainWithState areDetailsVisible={true}/>
    </>;
};