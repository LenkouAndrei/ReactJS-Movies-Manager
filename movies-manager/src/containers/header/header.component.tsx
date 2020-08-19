import React, { Component } from "react";
import { Logo } from "../../components";
import { Wrapper } from "../wrapper/wrapper.component";
import { Modal } from "../modal/modal.component";
import { FormPage } from "../form-page/form-page.component";
import { TNullable } from "../../types/types";
import "./header.component.scss";

export interface IHeaderProps {
    pageName: PageName;
};

export enum PageName {
    Main = 'Main',
    AddForm = 'AddForm',
    EditForm = 'EditForm',
}

const blockName = "header";

interface IMainState {
    isDialogOpen: boolean;
    pageName: PageName;
}

export class Header extends Component<IHeaderProps, IMainState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isDialogOpen: false,
            pageName: this.props.pageName,
        }
    }

    showModal = () => {
        this.setState({ isDialogOpen: true });
    };

    hideModal = () => {
        this.setState({ isDialogOpen: false });
    };

    getHeaderElement(): TNullable<JSX.Element> {
        switch (this.props.pageName) {
            case PageName.Main:
                return <>
                    <button
                        className={'add-btn'}
                        onClick={this.showModal}>+ Add Movie</button>
                    <Modal isOpen={this.state.isDialogOpen} handleClose={this.hideModal}>
                        <FormPage {...null}/>
                    </Modal>
                </>;
            default:
                return null;
        }
    }

    render() {
        return <header className={blockName}>
            <Wrapper>
                <>
                    <section className={`${blockName}__top`}>
                        <Logo/>
                        { this.getHeaderElement() }
                    </section>
                </>
            </Wrapper>
        </header>;
    }
};