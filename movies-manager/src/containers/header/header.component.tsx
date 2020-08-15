import React from "react";
import { Logo, AddButton, Search } from "../../components";
import { Wrapper } from "../wrapper/wrapper.component";
import "./header.component.scss";

interface IHeaderProps {
    pageName: string;
};

const blockName = "header";
const pagesWithAddBtn = ['main'];

export const Header = (/*{ pageName = 'main' }: IHeaderProps*/) => <header className={blockName}>
    <Wrapper>
        <>
            <section className={`${blockName}__top`}>
                <Logo/>
                <AddButton/>
            </section>
        </>
    </Wrapper>
</header>;