import React from 'react';
import './spinner.scss';

const blockName = 'spinner';

type TLoadingIndicator = () => JSX.Element;

export const LoadingIndicator: TLoadingIndicator = () => (<div className={`${blockName}__container`}>
    <div className={`${blockName}__wrapper`}>
        <div className={`${blockName}`}></div>
    </div>
</div>);