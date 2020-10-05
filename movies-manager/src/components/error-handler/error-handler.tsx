import React from 'react';
import './error-handler.scss';

const blockName = 'error-handler';

type TErrorHandler = ({errorMessage}: {errorMessage: string}) => JSX.Element;

export const ErrorHandler: TErrorHandler = ({errorMessage}: {errorMessage: string}) =>
(<div className={blockName}>
    <h2 className={`${blockName}__headline`}>Oops... Something went wrong</h2>
    <span className={`${blockName}__info`}>{ errorMessage }</span>
</div>);