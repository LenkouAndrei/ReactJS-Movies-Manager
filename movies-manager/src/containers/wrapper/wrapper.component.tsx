import React, { ReactChild } from 'react';
import './wrapper.component.scss';

type TWrapper = ({children}: { children: ReactChild }) => JSX.Element;
export const Wrapper: TWrapper = ({children}: { children: ReactChild }) => <div className='wrapper'>
    {children}
</div>;