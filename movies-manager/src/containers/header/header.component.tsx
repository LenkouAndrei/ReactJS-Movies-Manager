import React from "react";
import { Logo, AddButton, Search } from "../../components";
import { Wrapper } from "../wrapper/wrapper.component";
import "./header.component.scss";

const blockName = "header";
export const Header = () => <header className={blockName}>
    <Wrapper>
        <>
            <section className={`${blockName}__top`}>
                <Logo/>
                <AddButton/>
            </section>
            <Search/>
        </>
    </Wrapper>
</header>;