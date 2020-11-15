import React from 'react';
import { Header, PageName } from '../';
import { Wrapper } from '../wrapper/wrapper';
import { Link } from 'react-router-dom';
import './not-found-page.scss';

const blockName = 'not-found';
export const NotFoundPage = () => {
    return <>
        <Header pageName={PageName.NotFound}/>
        <main className={`${blockName}__main`}>
            <Wrapper postfix={`${blockName}__wrapper`}>
                <>
                    <h2 className={`${blockName}__headline`}>Page Not Found</h2>
                    <div className={`${blockName}__error`}>404</div>
                    <Link to='/search/' className={`${blockName}__link`}>Go back to home</Link>
                </>
            </Wrapper>
        </main>
    </>;
};