import React, { Component } from "react";
import { Logo, AddButton } from "../../components";
import { Wrapper } from "../wrapper/wrapper.component";
import { TNullable } from "../../types/types";
import "./header.component.scss";

export interface IHeaderProps {
    pageName: PageName;
};

export enum PageName {
    Main = 'Main',
    Form = 'Form'
}

const blockName = "header";

export const Header = ({ pageName }: IHeaderProps) => {
    let headerElement: TNullable<JSX.Element> = null;
    switch (pageName) {
        case PageName.Main:
            headerElement = <AddButton/>;
            break;
        default:
            break;
    }

return (<header className={blockName}>
    <Wrapper>
        <>
            <section className={`${blockName}__top`}>
                <Logo/>
                { headerElement }
            </section>
        </>
    </Wrapper>
</header>)
};