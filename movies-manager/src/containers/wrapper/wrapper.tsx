import React, { ReactChild } from 'react';
import './wrapper.scss';

interface IWrapperProps {
    children: ReactChild;
    postfix?: string;
}

type TWrapper = (props: IWrapperProps) => JSX.Element;
export const Wrapper: TWrapper = ({ children, postfix }: IWrapperProps) => (
    <div className={`wrapper ${postfix || ''}`}>
        {children}
    </div>
);